import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './button/Button.css';
import Content from './Content';
import Author from './Author';

const PostDetail = (props) => {
  const [state, setState] = useState({
    post: null,
    comment: '',
    // commentAuthor: ''
  });
  // const [post, setPost] = useState(null);
  const id = props.match.params.postId;
  // const [comment, setComment] = useState('');
  // const [commentAuthor, setCommentAuthor] = useState('');

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(`/api/posts/${id}`);
      setState({ ...state, post: response.data });
    };
    getPost();
  }, [id]);

  const handleUpvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setState({ ...state, post: res.data });
  };

  const handleDownvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setState({ ...state, post: res.data });
  };

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post(`/api/posts/${id}/comments`, {
  //       content: state.comment,
  //       // commentAuthor: state.commentAuthor,
  //     })
  //     .then(() => {
  //       // refresh();
  //       setState({ ...state, comment: comment.content });
  //       // setCommentAuthor(author);
  //     });
  // };

  // document.querySelector('#review-form').onsubmit = (event) => {
  //   // 0 when the user submits the form
  //   event.preventDefault();

  //   const mealId = document.location.pathname.split('/')[2];
  //   // 1 we make an API call to our `POST` `/rooms/:id/comments` -> BACKEND
  //   console.log('ourmeal id', mealId);
  //   axios
  //     .post(`/meals/${id}/comments`, {
  //       content: document.querySelector('input').value,
  //     })
  //     .then(() => {
  //       console.log('first thn');
  //       // 4 we get the response from our API call (1)
  //       // 5 we make an API call to our `GET` `/rooms/:id/comments` -> BACKEND
  //       return axios.get(`/meals/${mealId}/reviews`);
  //     })
  //     .then((response) => {
  //       console.log('response: ', response);
  //       // 8 we iterate through the list of comments from the server to manipulate the DOM
  //       const reviewBox = document.getElementById('review-box');
  //       reviewBox.innerHTML = '';
  //       response.data.forEach((review) => {
  //         const p = document.createElement('p');
  //         p.innerHTML = `${review.content} <i>${review.author}</i>`;
  //         reviewBox.appendChild(p);
  //       });
  //       document.querySelector('form').reset();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  if (!state.post) {
    return <div>Loading...</div>;
  }

  const { _id, title, type, content, image, video, _author, created_at, upvote_count } = state.post;
  return (
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
      {props.isLoggedIn ? (
        <>
          <button className="button" onClick={handleUpvote}>
            Upvote
          </button>
          <button className="button" onClick={handleDownvote}>
            Down
          </button>
          {/* <form onSubmit={handleSubmit}></form>
          <label htmlFor="comment">Comment</label>
          <input name="comment" value={state.comment} onChange={handleChange} type="text" /> */}
        </>
      ) : (
        <Link to="/login">Login to upvote this post</Link>
      )}
    </div>
  );
};

export default PostDetail;
