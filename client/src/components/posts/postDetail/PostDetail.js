import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Author from './Author';
// import downArrow from '../../../images/DownArrow.jpg';
// import upArrow from '../../../images/UpArrow.jpg';
import Bin from '../../../images/Bin.png';
import Save from '../../../images/SaveFlag.png';
import Votes from '../postList/postCard/Votes';

const PostDetail = (props) => {
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState('');
  const [showComments, setShowComments] = useState(false);

  const id = props.match.params.postId;

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
      console.log('this is the author if detail', res.data._author);
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

  const deletePost = (id) => {
    if (props.user._id === post._author._id) {
      axios.post(`/api/posts/${id}/delete`);
    }
  };

  const savePost = () => {
    axios.post(`/api/posts/${id}/save`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/posts/${id}/comments`, {
        message: message,
      })
      .then(() => {
        getPost();
        setMessage('');
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const toggleShowComments = () => {
    setShowComments(!showComments);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const { _id, title, content, image, video, _author, created_at, upvote_count, comments } = post;
  return (
    <div className="post-detail-container">
      <div className="full-post-container">
        <div className="postcard-container">
          <div className="card-vote-container">
            <div>
              <Votes handleDownvote={handleDownvote} handleUpvote={handleUpvote} id={id} />
            </div>
            <div key={_id} className="post-content">
              <b>{title}</b>
              <p>{content}</p>
              <img src={image} alt="" />
              {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />}
              <Author
                author={_author}
                date={new Date(created_at).toDateString()}
                time={new Date(created_at).toTimeString().slice(0, 8)}
              />{' '}
              <p>
                {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
              </p>
              <div className="bin-comments-container">
                <div className="delete-save-container">
                  <button onClick={() => deletePost(id)}>
                    <img style={{ width: '30px' }} src={Bin} alt="delete" />
                  </button>
                  <button onClick={() => savePost(id)}>
                    <img style={{ width: '50px' }} src={Save} alt="Save" />
                  </button>
                </div>
                <div className="comments-container">
                  <h3 style={{ color: 'coral' }}>Comments</h3>
                  {showComments
                    ? comments.reverse().map((comment) => (
                        <div key={comment._id} style={{ marginBottom: '12px' }}>
                          <p>
                            {comment.message}
                            {'  '}
                            <span style={{ color: 'deepskyblue' }}>
                              <Link to={`/posts/authored/${comment.author._id}`}>-{comment.author.username}</Link>
                            </span>
                          </p>
                        </div>
                      ))
                    : comments
                        .reverse()
                        .slice(0, 5)
                        .map((comment) => (
                          <div key={comment._id} style={{ marginBottom: '12px' }}>
                            <p>
                              {comment.message}
                              {'   '}
                              <span style={{ color: 'deepskyblue' }}>
                                <Link to={`/posts/authored/${comment.author._id}`}>-{comment.author.username}</Link>
                              </span>
                            </p>
                          </div>
                        ))}
                  {showComments ? (
                    <button onClick={toggleShowComments}>Hide Comments</button>
                  ) : (
                    <button onClick={toggleShowComments} style={{ color: 'deepskyblue' }}>
                      ...
                    </button>
                  )}
                  <form onSubmit={handleSubmit}>
                    <input
                      style={{ border: ' 2px solid deepskyblue ' }}
                      name="comment"
                      value={message}
                      onChange={(text) => setMessage(text.target.value)}
                      type="text"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
