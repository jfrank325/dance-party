import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import PostsList from './postList/PostsList';
import Search from './postList/Search';
import Pencil from '../images/Pencil1.png';

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

  const sortByUpvote = () => {
    let sortedPosts = posts.sort((a, b) => a.upvote_count - b.upvote_count);
    setPosts(sortedPosts);
  };

  const sortByDownvote = () => {
    let sortedDownPosts = posts.sort((a, b) => b.upvote_count - a.upvote.count);
    setPosts(sortedDownPosts);
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
      <Search updateSearchText={updateSearchText} executeSearch={executeSearch} query={query} />
      <div className="content-container">
        <div className="create-sort-container">
          <div className="">
            <button className="sort-button" onClick={getNewestPosts}>
              Newest
            </button>
            <button className="sort-button" onClick={sortByUpvote}>
              Upvotes
            </button>
            <button className="sort-button" onClick={sortByDownvote}>
              Downvotes
            </button>
          </div>
          <div id="create-container">
            <img style={{ width: '30px', paddingRight: '5px' }} src={Pencil} alt="Pencil" />
            {props.user && createPost && <PostForm refresh={getData} />}
            <button onClick={toggleCreatePost}> Create Post</button>
          </div>
        </div>
        <PostsList posts={posts} />
      </div>
    </div>
  );
};

export default Posts;
