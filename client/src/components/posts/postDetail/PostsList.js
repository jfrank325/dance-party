import React from 'react';
// import PostCard from './postCard/PostCard';
import PostDetail from './PostDetail';

const PostsList = ({ posts, deletePost, user }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <PostDetail key={post._id} post={post} user={user} deletePost={deletePost} index={index}></PostDetail>
      ))}
    </div>
  );
};

export default PostsList;
