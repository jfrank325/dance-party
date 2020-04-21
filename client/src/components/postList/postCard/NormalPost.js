import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import upArrow from '../../../images/UpArrow.jpg';
import downArrow from '../../../images/DownArrow.jpg';
import Author from '../../postDetail/Author';
import axios from 'axios';

const NormalPost = ({ post }) => {
  const [thisPost, setThisPost] = useState(post);
  const { _id, title, content, image, video, upvote_count, _author, created_at } = thisPost;
  const id = post._id;

  const handleUpvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setThisPost(res.data);
  };

  const handleDownvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setThisPost(res.data);
  };

  return (
    <div className="full-post-container">
      <div className="postcard-container">
        <div className="card-vote-container">
          <div>
            {/* {props.isLoggedIn ? ( */}
            <div className="arrow-container">
              <button onClick={handleUpvote}>
                <img src={upArrow} className="upvote" alt="Up Arrow" />
              </button>
              <button onClick={handleDownvote}>
                <img src={downArrow} className="upvote" alt="Down Arrow" />
              </button>
            </div>
            {/* ) : ( */}
            {/* <Link to="/login">Login to upvote this post</Link> */}
            {/* )} */}
          </div>
          <div key={_id} className="">
            <Link to={`/posts/${_id}`}>
              <b>{title}</b>
              <p>{content}</p>
              <img src={image} alt="" />
              {video ? <video autoPlay loop muted src={video} controls controlsList="nodownload" /> : <> </>}
            </Link>

            <Author author={_author.username} date={new Date(created_at).toDateString()} />
            <p>
              {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalPost;
