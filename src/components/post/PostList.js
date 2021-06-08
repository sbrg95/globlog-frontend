import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/user/UserContext';
import PostItem from './PostItem';
import PostLoader from './PostLoader';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import SearchPost from './SearchPost';
import { getApiUrl } from '../../utils/functions';

const apiUrl = getApiUrl();

const PostList = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();
  const { isAuthenticated } = userContext;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    if (!isAuthenticated && id && !loading) {
      history.push('/login');
    }

    axios.get(`${apiUrl}/api/post`).then((res) => {
      if (mounted) {
        setPosts(res.data.data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [isAuthenticated, id, loading, history]);

  if (loading) {
    return <PostLoader />;
  }

  const searchedPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchPost value={query} onChange={setQuery} />
      {id
        ? searchedPosts
            .filter((post) => post.createdBy === id)
            .map((post) => <PostItem key={post.id} post={post} admin={true} />)
        : searchedPosts.map((post) => <PostItem key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
