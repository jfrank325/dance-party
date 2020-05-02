import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostDetail from './postDetail/PostDetail';

const SinglePost = ({ user, ...props }) => {
  const [post, setPost] = useState('');

  const id = props.match.params.postId;

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    };
    getPost();
  }, [id]);

  return (
    <div>
      {' '}
      <PostDetail post={post} user={user} postLink={post.link} />{' '}
    </div>
  );
};

export default SinglePost;
