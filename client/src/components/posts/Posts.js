import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostForm from './PostForm';
import PostsList from './postList/PostsList';
import Search from './Search';
import Sort from './Sort';
import Pencil from '../../images/Pencil1.png';

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [createPost, setCreatePost] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get('/api/posts');
    setPosts(res.data.reverse());
  };

  const sortByUpvotes = () => setPosts([...posts].sort((a, b) => b.upvote_count - a.upvote_count));

  const sortByCommentCount = () => setPosts([...posts].sort((a, b) => b.comments.length - a.comments.length));

  const sortByNewest = () => {
    getData();
  };

  const deletePost = (id) => {
    setPosts([...posts].filter((post) => id !== post._id));
    getData();
  };

  const executeSearch = () => {
    let filteredPosts = [...posts].filter((post) =>
      post.content
        ? post.content.toLowerCase() && post.title.toLowerCase().includes(query.toLowerCase())
        : post.title.toLowerCase().includes(query.toLowerCase())
    );
    query.length > 0 ? setPosts(filteredPosts) : getData();
    setQuery('');
  };

  const toggleCreatePost = () => {
    setCreatePost(!createPost);
  };

  return (
    <div>
      <Search updateSearchText={(text) => setQuery(text)} executeSearch={executeSearch} query={query} />
      <div className="content-container">
        <div className="create-sort-container">
          <Sort sortByNewest={sortByNewest} sortByUpvotes={sortByUpvotes} sortByCommentCount={sortByCommentCount} />
          <div>
            {props.user && !createPost ? (
              <div id="create-container">
                <img style={{ width: '30px', paddingRight: '5px' }} src={Pencil} alt="Pencil" />
                <button onClick={toggleCreatePost}> Create Post</button>
              </div>
            ) : props.user ? (
              <div className="postform-container">
                <PostForm refresh={() => getData()} closeForm={toggleCreatePost} />
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
        <PostsList posts={posts} user={props.user} deletePost={deletePost} />
      </div>
    </div>
  );
};

export default Posts;
