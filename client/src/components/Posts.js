import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostForm from './PostForm';
import PostsList from './postList/PostsList';
import Search from './postList/Search';
import Pencil from '../images/Pencil1.png';

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [createPost, setCreatePost] = useState(false);
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get('/api/posts');
    setPosts(res.data.reverse());
  };
  // const getNewestPosts = async () => {
  //   const res = axios.get('/api/posts?sortBy=created_at');
  //   setPosts(res.data);
  // };

  const sortByUpvotes = () => {
    let sortedUp = [...posts].sort((a, b) => b.upvote_count - a.upvote_count);
    setPosts(sortedUp);
  };

  const sortByDownvotes = () => {
    let sortedDown = [...posts].sort((a, b) => a.upvote_count - b.upvote_count);
    setPosts(sortedDown);
  };

  const sortByNewest = () => {
    setPosts([...posts].sort((a, b) => a.created_at - b.created_at));
  };

  const executeSearch = () => {
    let filteredPosts = [...posts].filter((post) => post.title.toLowerCase().includes(query));
    query ? setPosts(filteredPosts) : setPosts(posts);
    setQuery('');
  };

  const toggleCreatePost = () => {
    setCreatePost(!createPost);
  };
  console.log('these are the posts in posts', posts);

  return (
    <div>
      <Search updateSearchText={(text) => setQuery(text)} executeSearch={executeSearch} query={query} />
      <div className="content-container">
        <div className="create-sort-container">
          <div className="">
            <button className="sort-button" onClick={sortByNewest}>
              Newest
            </button>{' '}
            <button className="sort-button" onClick={sortByUpvotes}>
              Upvotes
            </button>
            <button className="sort-button" onClick={sortByDownvotes}>
              Downvotes
            </button>
          </div>
          <div>
            {props.user && !createPost ? (
              <div id="create-container">
                <img style={{ width: '30px', paddingRight: '5px' }} src={Pencil} alt="Pencil" />
                <button onClick={toggleCreatePost}> Create Post</button>
              </div>
            ) : props.user ? (
              <div className="postform-container">
                <PostForm refresh={getData} />
                <button onClick={toggleCreatePost} className="dot">
                  ↩
                </button>
              </div>
            ) : (
              <div>
                <h3>
                  {' '}
                  <Link className="light-blue" to="/signup">
                    Sign Up{' '}
                  </Link>
                  or{' '}
                  <Link className="light-blue" to="/login">
                    Login{' '}
                  </Link>
                  to create a Post
                </h3>
              </div>
            )}
          </div>
        </div>
        <PostsList posts={posts} />
      </div>
    </div>
  );
};

export default Posts;
