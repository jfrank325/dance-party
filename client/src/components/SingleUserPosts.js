import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostsList from './posts/postDetail/PostsList';
import Search from './posts/Search';
import Sort from './posts/Sort';

const SingleUserPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  const id = props.match.params.authorId;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/api/posts/authored/${id}`);
      setPosts(res.data._posts.reverse());
    };
    getData();
  }, [id]);

  const getData = async () => {
    const res = await axios.get(`/api/posts/authored/${id}`);
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

  return (
    <div>
      <Search updateSearchText={(text) => setQuery(text)} executeSearch={executeSearch} query={query} />
      <div className="content-container">
        <div className="create-sort-container">
          <Sort sortByNewest={sortByNewest} sortByUpvotes={sortByUpvotes} sortByCommentCount={sortByCommentCount} />
        </div>
        <PostsList posts={posts} user={props.user} deletePost={deletePost} />
      </div>
    </div>
  );
};

export default SingleUserPosts;
