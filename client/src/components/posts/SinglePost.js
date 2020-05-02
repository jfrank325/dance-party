import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostDetail from './postDetail/PostDetail';

const SinglePost = ({ user, ...props }) => {
  const [post, setPost] = useState('');

  const postId = props.match.params.postId;

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/api/posts/${postId}`);
      setPost(res.data);
    };
    getPost();
  }, [postId]);

  return (
    <div>
      {' '}
      <PostDetail post={post} user={user} postLink={post.link} singlePost={postId} />{' '}
    </div>
  );
};

export default SinglePost;
