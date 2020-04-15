import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './button/Button.css';
import Content from './Content';
import Author from './Author';

const PostDetail = (props) => {
  const [post, setPost] = useState(null);
  const id = props.match.params.postId;

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data);
    };
    getPost();
  }, [id]);

  const handleUpvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setPost(res.data);
  };

  const handleDownvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setPost(res.data);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const { title, type, content, _author, created_at, upvote_count } = post;
  return (
    <div>
      <h1>{title}</h1>
      {type === 'link' ? (
        <Content type={type} text={content}>
          <a href={content}>{content}</a>
        </Content>
      ) : (
        <Content type={type} text={content} />
      )}
      <Author author={_author.username} />
      <span>on {new Date(created_at).toDateString()}</span>
      <p>
        {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
      </p>
      {props.isLoggedIn ? (
        <>
          <button className="button" onClick={handleUpvote}>
            Upvote
          </button>
          <button className="button" onClick={handleDownvote}>
            Down
          </button>
        </>
      ) : (
        <Link to="/login">Login to upvote this post</Link>
      )}
    </div>
  );
};

export default PostDetail;
