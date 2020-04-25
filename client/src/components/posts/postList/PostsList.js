import React from 'react';
import PostCard from './postCard/PostCard';

const PostsList = ({ posts, deletePost, user }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <PostCard key={post._id} post={post} user={user} deletePost={deletePost} index={index}></PostCard>
      ))}
    </div>
  );
};

export default PostsList;
