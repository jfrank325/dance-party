import React, { useState } from 'react';
import PostCard from './PostCard';

const PostsList = (props) => {
  return (
    <div>
      {props.posts.map((post, index) => (
        <PostCard key={index} post={post}></PostCard>
      ))}
    </div>
  );
};

export default PostsList;
