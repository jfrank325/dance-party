import React from 'react';
import NormalPost from './NormalPost';
import LinkPost from './LinkPost';

const PostCard = ({ post, deletePost }) =>
  !post.link ? (
    <NormalPost deletePost={deletePost} post={post} />
  ) : (
    <LinkPost deletePost={deletePost} post={post} />
  );

export default PostCard;
