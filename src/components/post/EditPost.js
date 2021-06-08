import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../../context/user/UserContext';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-sbrg95-custom-build';
import Alert from '../layout/Alert';
import PostLoader from './PostLoader';
import { postValidation } from '../../utils/validation';
import { getApiRoute, getCkeditorConfig } from '../../utils/functions';

const EditPost = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();
  const { isAuthenticated } = userContext;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    let mounted = true;
    if (!isAuthenticated) {
      history.push('/login');
    }

    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    axios
      .get(getApiRoute(`/api/post/${id}`), config)
      .then((res) => {
        if (mounted) {
          setTitle(res.data.data.title);
          setDescription(res.data.data.description);
          setBody(res.data.data.body);
        }
      })
      .catch((err) => {
        if (mounted) {
          setAlerts(['Error loadind the post...']);
        }
      });

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, id, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = postValidation({ title, body });
    if (errs.length !== 0) {
      setAlerts(errs);
      setTimeout(() => {
        setAlerts([]);
      }, 5000);
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      try {
        await axios.put(
          getApiRoute(`/api/post/${id}`),
          {
            title,
            description,
            body,
          },
          config
        );

        history.push('/');
      } catch (err) {
        const errors = err.response.data.errors;
        const flatErrors = errors.map((error) => error[Object.keys(error)[0]]);
        setAlerts(flatErrors);
        setTimeout(() => {
          setAlerts([]);
        }, 5000);
      }
    }
  };

  if (!isAuthenticated) {
    return <PostLoader />;
  }

  return (
    <StyledEditPost>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          placeholder='Post Title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name='description'
          id='description'
          value={description}
          placeholder='Post description'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className='ckeditor-container'>
          <CKEditor
            editor={ClassicEditor}
            data={body}
            config={getCkeditorConfig()}
            onChange={(event, editor) => {
              const data = editor.getData();
              setBody(data);
            }}
          />
        </div>

        <button className='btn btn-primary btn-block' type='submit'>
          Edit Post
        </button>
      </form>
      {alerts.length !== 0 && <Alert errors={alerts} />}
    </StyledEditPost>
  );
};

const StyledEditPost = styled.div`
  width: 100%;
  margin: 2rem 0;
  padding: 2rem;
  background-color: #fff;
  form {
    width: 100%;
    .ck-editor__editable_inline {
      min-height: 200px;
    }
    input[type='text'],
    textarea {
      width: 100%;
    }
    button {
      margin-top: 2rem;
    }
    .ckeditor-container {
      text-align: justify;
    }
  }

  @media (max-width: 500px) {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

export default EditPost;
