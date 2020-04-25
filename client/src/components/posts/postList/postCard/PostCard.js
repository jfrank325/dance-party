import React from 'react';
import NormalPost from './NormalPost';
import LinkPost from './LinkPost';

const PostCard = ({ post, deletePost, user }) =>
  !post.link ? (
    <NormalPost deletePost={deletePost} user={user} post={post} />
  ) : (
    <LinkPost deletePost={deletePost} user={user} post={post} />
  );

export default PostCard;
