import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import PostsList from './postList/PostsList';
import Search from './postList/Search';

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [createPost, setCreatePost] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get('/api/posts');
    setPosts(res.data);
  };

  const getNewestPosts = async () => {
    const res = axios.get('/api/posts?sortBy=created_at');
    setPosts(res.data);
  };

  const updateSearchText = (text) => {
    setQuery(text);
  };

  const executeSearch = () => {
    let filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(query));
    setPosts(filteredPosts);
    setQuery('');
  };

  const toggleCreatePost = () => {
    setCreatePost(!createPost);
  };

  return (
    <div>
      <button onClick={getNewestPosts}>sort by new</button>
      {props.user && createPost && <PostForm refresh={getData} />}
      <button onClick={toggleCreatePost}>Create Post</button>
      <Search updateSearchText={updateSearchText} executeSearch={executeSearch} query={query} />
      <PostsList posts={posts} />
    </div>
  );
};

export default Posts;
