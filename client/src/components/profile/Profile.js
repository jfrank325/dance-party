import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import PostsList from '../posts/postDetail/PostsList';
import Search from '../posts/Search';
import ProfileSort from './ProfileSort';

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [upvotedPosts, setUpvotedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const id = user._id;

  useEffect(() => {
    const getUserPosts = async () => {
      const res = await axios.get(`/api/auth/user/${id}`);
      setUserPosts([...res.data._posts.reverse()]);
      setPosts([...res.data._posts]);
      setUpvotedPosts([...res.data._upvotes.reverse()]);
      setSavedPosts([...res.data._savedposts.reverse()]);
    };
    getUserPosts();
  }, [id]);

  const deletePost = (id) => {
    setPosts([...posts].filter((post) => id !== post._id));
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
          <ProfileSort
            getUserPosts={() => setPosts(userPosts)}
            getUpVoted={() => setPosts(upvotedPosts)}
            getSaved={() => setPosts(savedPosts)}
          />
        </div>
      </div>
      <PostsList posts={posts} deletePost={deletePost} user={user} />
    </div>
  );
};

export default Profile;
