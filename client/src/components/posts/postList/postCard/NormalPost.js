import React, { useState } from 'react';
import axios from 'axios';
import NormalContent from './NormalContent';
import Votes from './Votes';

const NormalPost = ({ post, deletePost, user }) => {
  const [thisPost, setThisPost] = useState(post);
  const { title, content, image, video, upvote_count, _author, created_at } = thisPost;
  const id = post._id;

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

  const deleteThisPost = () => {
    if (user._id === _author._id) {
      axios.post(`/api/posts/${id}/delete`);
      deletePost(id);
    }
  };

  const saveThisPost = () => {
    axios.post(`/api/posts/${id}/save`);
  };

  return (
    <div className="full-post-container">
      <div className="postcard-container">
        <div className="card-vote-container">
          <div className="votes">
            <Votes handleUpvote={handleUpvote} handleDownvote={handleDownvote} id={id} />
          </div>
          <NormalContent
            id={id}
            title={title}
            content={content}
            author={_author}
            image={image}
            video={video}
            upvoteCount={upvote_count}
            createdAt={created_at}
            deletePost={deleteThisPost}
            savePost={saveThisPost}
          />
        </div>
      </div>
    </div>
  );
};

export default NormalPost;
