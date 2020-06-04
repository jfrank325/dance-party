import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Author from './Author';
import Content from './Content';
import PostLink from './PostLink';
import UpvoteCount from './UpvoteCount';
import BinSave from './BinSave';
import Comments from './Comments';
import Votes from './Votes';
import MainContent from './MainContent';
import { Popup } from 'semantic-ui-react';

const PostDetail = ({ post, deletePost, user, postLink, singlePost }) => {
  const [thisPost, setThisPost] = useState(post);
  const [message, setMessage] = useState('');
  const [showComments, setShowComments] = useState(false);

  const { title, content, image, video, comments, upvote_count, _author, created_at, link } = thisPost
    ? thisPost
    : post;
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
      if (!singlePost) {
        deletePost(id);
      }
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
    <>
      {singlePost && <div style={{ height: '3rem' }}></div>}
      <div className="post-detail-container">
        <div className="full-post-container">
          <div className="postcard-container">
            <div className="card-vote-container">
              <div>
                <Votes handleDownvote={handleDownvote} handleUpvote={handleUpvote} id={id} />
              </div>
              <div key={id} className="post-content">
                <MainContent id={id} title={title} image={image} video={video} />
                <Author
                  author={_author}
                  date={new Date(created_at).toDateString()}
                  time={new Date(created_at).toTimeString().slice(0, 8)}
                />{' '}
                {link && <PostLink postLink={link} />}
                {content && <Content content={content} singlePost={singlePost} id={id} />}
                <UpvoteCount upvote_count={upvote_count} />
                <div className="bin-comments-container">
                  <BinSave deleteThisPost={deleteThisPost} savePost={savePost} id={id} />
                  {comments && singlePost ? (
                    <Comments
                      setMessage={setMessage}
                      handleChange={(text) => setMessage(text.target.value)}
                      comments={[...comments].reverse()}
                      handleSubmit={handleSubmit}
                      toggleShowComments={toggleShowComments}
                      message={message}
                      showComments={showComments}
                    />
                  ) : (
                    <Popup
                      style={{ color: 'var(--gray)', fontSize: '0.8rem' }}
                      content="Go To Comments"
                      trigger={
                        <Link to={`/posts/${id}`}>
                          <span style={{ color: 'var(--sky)' }}>{comments.length} </span>Comments
                        </Link>
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
