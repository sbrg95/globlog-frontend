import { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { formatDate, toUpperCaseFirstChar } from '../../utils/functions';

const apiUrl = process.env.API_URL || 'http://localhost:3000';

Modal.setAppElement('#root');

const PostItem = ({ post, admin }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { id, title, description, author, createdAt } = post;

  const history = useHistory();

  const openModal = () => setIsOpened(true);
  const closeModal = () => setIsOpened(false);

  const handleUpdatePost = (e) => {
    e.preventDefault();
    history.push(`/post/edit/${id}`);
  };

  const handleRemovePost = () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    axios.delete(`${apiUrl}/api/post/${id}`, config).then((res) => {
      history.push('/');
    });
  };
  return (
    <StyledPostItem>
      <div className='post-head'>
        <Link to={`/post/${id}`}>
          <h1>{title}</h1>
        </Link>
        {admin && (
          <div className='admin'>
            <Link to='/' title='Edit' onClick={handleUpdatePost}>
              <i className='fas fa-edit'></i>
            </Link>
            <Link
              to='/'
              title='Remove'
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              <i className='fas fa-trash-alt'></i>
            </Link>
          </div>
        )}
      </div>
      <p className='date-author'>
        <em>
          <small>{`${formatDate(createdAt)} / ${toUpperCaseFirstChar(
            author
          )}`}</small>
        </em>
      </p>
      <p className='description'>{description}</p>
      <Link className='read-more' to={`/post/${id}`}>
        Read More...
      </Link>
      <Modal isOpen={isOpened} style={modalStyles}>
        <ModalBody>
          <h3>Are you sure about removing this post ?</h3>
          <div>
            <button className='btn btn-danger' onClick={handleRemovePost}>
              Yes
            </button>
            <button className='btn btn-primary' onClick={closeModal}>
              No
            </button>
          </div>
        </ModalBody>
      </Modal>
    </StyledPostItem>
  );
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalBody = styled.div`
  padding: 1rem;
  h3 {
    margin: 0 0 1rem 0;
    text-align: center;
  }
  div {
    display: flex;
    justify-content: center;
    button {
      width: 5rem;
      margin: 0 0.5rem;
    }
  }
`;

const StyledPostItem = styled.div`
  background-color: #fff;
  color: #333;
  width: 100%;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 1px 3px 20px rgba(0, 0, 0, 0.1);
  a {
    text-decoration: none;
  }
  p {
    text-align: justify;
  }
  h1 {
    color: #333;
    margin: 0;
    font-size: 1.3rem;
  }
  .date-author {
    margin: 0 0 0.5rem 0;
  }
  .read-more {
    text-decoration: underline;
    font-size: 1.2rem;
  }
  .post-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .admin {
      display: flex;
      font-size: 1.3rem;
      a:first-of-type {
        color: #0040f4;
        margin-right: 0.5rem;
      }
      a:last-of-type {
        color: #f41c24;
      }
      a:hover {
        opacity: 0.8;
      }
    }
  }

  @media (max-width: 500px) {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

export default PostItem;
