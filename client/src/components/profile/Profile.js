import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostsList from '../posts/postList/PostsList';
import Search from '../posts/Search';
import ProfileSort from './ProfileSort';

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getUserPosts = async () => {
      const res = await axios.get('api/posts');
      let userPosts = res.data.filter((post) => post._author._id === user._id);
      setPosts(userPosts);
    };
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const res = await axios.get('api/posts');
    let userPosts = res.data.filter((post) => post._author._id === user._id);
    setPosts(userPosts);
  };

  const getUpVoted = async () => {
    const res = await axios.get('api/posts');
    let upVotedPosts = res.data.filter((post) => user._upvotes.includes(post._id));
    setPosts(upVotedPosts);
  };

  const deletePost = (id) => {
    setPosts([...posts].filter((post) => id !== post._id));
    getUserPosts();
  };

  const executeSearch = () => {
    let filteredPosts = [...posts].filter((post) =>
      post.content
        ? post.content.toLowerCase() && post.title.toLowerCase().includes(query.toLowerCase())
        : post.title.toLowerCase().includes(query.toLowerCase())
    );
    query ? setPosts(filteredPosts) : setPosts(posts);
    setQuery('');
  };

  return (
    <div>
      <Search updateSearchText={(text) => setQuery(text)} executeSearch={executeSearch} query={query} />
      <div className="content-container">
        <div className="create-sort-container">
          <ProfileSort getUserPosts={getUserPosts} getUpVoted={getUpVoted} />
        </div>
      </div>
      <PostsList posts={posts} deletePost={deletePost} />
    </div>
  );
};

export default Profile;
