import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Author from './Author';
import BinSave from './BinSave';
import Comments from './Comments';
import Votes from './Votes';

const PostDetail = ({ post, deletePost, user, postLink, singlePost }) => {
  const [thisPost, setThisPost] = useState(post);
  const [message, setMessage] = useState('');
  const [showComments, setShowComments] = useState(false);

  const { title, content, image, video, comments, upvote_count, _author, created_at } = thisPost ? thisPost : post;
  const id = post._id;

  const getThisPost = async () => {
    const res = await axios.get(`/api/posts/${id}`);
    setThisPost(res.data);
  };

  const handleUpvote = async () => {
    if (user) {
      const res = await axios.post(`/api/posts/${id}/upvote`);
      setThisPost(res.data);
    }
  };

  const handleDownvote = async () => {
    if (user) {
      const res = await axios.post(`/api/posts/${id}/upvote`);
      setThisPost(res.data);
    }
  };

  const deleteThisPost = (id) => {
    if (user._id === post._author._id) {
      axios.post(`/api/posts/${id}/delete`);
      deletePost(id);
    }
  };

  const savePost = () => {
    if (user) {
      axios.post(`/api/posts/${id}/save`);
    }
  };

  const handleSubmit = (e) => {
    if (user) {
      e.preventDefault();
      axios
        .post(`/api/posts/${id}/comments`, {
          message: message,
          post: id,
        })
        .then(() => {
          setMessage('');
          getThisPost();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const toggleShowComments = () => {
    setShowComments(!showComments);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail-container">
      <div className="full-post-container">
        <div className="postcard-container">
          <div className="card-vote-container">
            <div>
              <Votes handleDownvote={handleDownvote} handleUpvote={handleUpvote} id={id} />
            </div>
            <div key={id} className="post-content">
              <Link to={`/posts/${id}`}>
                <b>{title}</b>

                <img src={image} alt="" />
                {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />}
              </Link>
              <Author
                author={_author}
                date={new Date(created_at).toDateString()}
                time={new Date(created_at).toTimeString().slice(0, 8)}
              />{' '}
              {postLink && (
                <div className="post-link">
                  <a href={postLink} rel="noreferrer noopener" target="_blank">
                    <p>Go to link </p>
                  </a>
                </div>
              )}
              {content && (
                <p className="post-content">
                  {singlePost ? content : content.length > 300 ? content.slice(0, 300) + '...' : content}
                </p>
              )}
              <p>
                {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
              </p>
              <div className="bin-comments-container">
                <BinSave deleteThisPost={deleteThisPost} savePost={savePost} id={id} />
                {comments && singlePost ? (
                  <Comments
                    handleChange={(text) => setMessage(text.target.value)}
                    comments={comments}
                    handleSubmit={handleSubmit}
                    toggleShowComments={toggleShowComments}
                    message={message}
                    showComments={showComments}
                  />
                ) : (
                  <Link to={`/posts/${id}`}>Comments</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
