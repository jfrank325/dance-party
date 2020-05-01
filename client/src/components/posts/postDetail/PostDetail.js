import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Author from './Author';
import Bin from '../../../images/Bin.png';
import Save from '../../../images/SaveFlag.png';
import Votes from './Votes';

const PostDetail = ({ post, deletePost, user }) => {
  const [thisPost, setThisPost] = useState(post);
  const [message, setMessage] = useState('');
  const [showComments, setShowComments] = useState(false);

  const { title, content, image, video, comments, upvote_count, _author, created_at } = thisPost;
  const id = post._id;

  // const id = props.match.params.postId;

  // useEffect(() => {
  //   const getPost = async () => {
  //     const res = await axios.get(`/api/posts/${id}`);
  //     setThisPost(res.data);
  //     console.log('this is the author if detail', res.data._author);
  //   };
  //   getPost();
  // }, [id]);

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
    axios.post(`/api/posts/${id}/save`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/posts/${id}/comments`, {
        message: message,
      })
      .then(() => {
        setMessage('');
        getThisPost();
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

  // const { _id, title, content, image, video, _author, created_at, upvote_count, comments } = post;
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
              <p className="post-content">{content}</p>
              <p>
                {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
              </p>
              <div className="bin-comments-container">
                <div className="delete-save-container">
                  <button onClick={() => deleteThisPost(id)}>
                    <img style={{ width: '30px' }} src={Bin} alt="delete" />
                  </button>
                  <button onClick={() => savePost(id)}>
                    <img style={{ width: '50px' }} src={Save} alt="Save" />
                  </button>
                </div>
                <div className="comments-container">
                  <h3>Comments</h3>
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
            {/* <div>
              <a href={link} rel="noreferrer noopener" target="_blank">
                <p>Go to link</p>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
