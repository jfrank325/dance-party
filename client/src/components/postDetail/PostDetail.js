import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './button/Button.css';
// import Content from './Content';
import Author from './Author';
import downArrow from '../../images/DownArrow.jpg';
import upArrow from '../../images/UpArrow.jpg';
// import { set } from 'mongoose';

const PostDetail = (props) => {
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState('');

  const id = props.match.params.postId;

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
      console.log('post?', res.data);
    };
    getPost();
  }, [id]);

  const getPost = async () => {
    const res = await axios.get(`/api/posts/${id}`);
    setPost(res.data);
  };

  const handleUpvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setPost(res.data);
  };

  const handleDownvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setPost(res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/posts/${id}/comments`, {
        message: message,
      })
      .then(() => {
        // refresh();
        getPost();
        console.log('this is a message', message);
        // return axios.get(`/api/posts/${id}/comments`);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  console.log('message', message);
  if (!post) {
    return <div>Loading...</div>;
  }

  const { _id, title, content, image, video, _author, created_at, upvote_count, comments } = post;
  return (
    <div className="full-post-container">
      <div>
        {props.isLoggedIn ? (
          <div className="arrow-container">
            <button onClick={handleUpvote}>
              <img src={upArrow} className="upvote" alt="Up Arrow" />
            </button>
            <button onClick={handleDownvote}>
              <img src={downArrow} className="upvote" alt="Down Arrow" />
            </button>
          </div>
        ) : (
          <Link to="/login">Login to upvote this post</Link>
        )}
      </div>
      <div key={_id} className="postcard-container">
        <b>{title}</b>
        <p>{content}</p>
        <img src={image} alt="" />
        {video ? <video autoPlay loop muted src={video} controls /> : <> </>}

        <Author author={_author.username} />

        <span>on {new Date(created_at).toDateString()}</span>
        <p>
          {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment">Comments: {'    '}</label>
          <input name="comment" value={message} onChange={(text) => setMessage(text.target.value)} type="text" />
        </form>
        {comments.map((comment, index) => (
          <p key={index}>{comment.message}</p>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
