import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import PostsList from '../posts/postDetail/PostsList';
import Search from '../posts/Search';
import ProfileSort from './ProfileSort';

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  // const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const res = await axios.get('api/posts');
    setPosts(res.data);
    console.log(res.data);
  };

  const userPosts = () => {
    setPosts([...posts].filter((post) => post._author._id === user._id));
    console.log([...posts].filter((post) => post._author._id === user._id));
  };

  const upVotedPosts = () => {
    setPosts([...posts].filter((post) => user._upvotes.includes(post._id)));
    console.log([...posts].filter((post) => user._upvotes.includes(post._id)));
  };

  const savedPosts = () => {
    setPosts([...posts].filter((post) => user._savedposts.includes(post._id)));
    console.log([...posts].filter((post) => user._savedposts.includes(post._id)));
  };

  const deletePost = (id) => {
    setPosts([...posts].filter((post) => id !== post._id));
    getPosts();
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
          <ProfileSort getUserPosts={userPosts} getUpVoted={upVotedPosts} getSaved={savedPosts} />
        </div>
      </div>
      <PostsList posts={posts} deletePost={deletePost} />
    </div>
  );
};

export default Profile;
