import React, { useState } from 'react';
import axios from 'axios';
import NormalContent from './NormalContent';
import Votes from './Votes';

const NormalPost = ({ post, deletePost }) => {
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

  const deleteThisPost = () => {
    axios.post(`/api/posts/${id}/delete`);
    deletePost(id);
    // console.log(res);
  };

  return (
    <div className="full-post-container">
      <div className="postcard-container">
        <div className="card-vote-container">
          <div>
            {/* {props.isLoggedIn ? ( */}
            <Votes handleUpvote={handleUpvote} handleDownvote={handleDownvote} id={id} />

            {/* ) : ( */}
            {/* <Link to="/login">Login to upvote this post</Link> */}
            {/* )} */}
          </div>
          <NormalContent post={thisPost} deletePost={deleteThisPost} />
          {/* <button onClick={() => deleteThisPost(id)}>Try this delete</button> */}
        </div>
      </div>
    </div>
  );
};

export default NormalPost;
