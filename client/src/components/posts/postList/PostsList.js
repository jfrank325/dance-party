import React from 'react';
import PostCard from './postCard/PostCard';

const PostsList = ({ posts, deletePost }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} deletePost={deletePost} index={index}></PostCard>
      ))}
    </div>
  );
};

export default PostsList;
