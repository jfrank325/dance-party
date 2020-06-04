import React from 'react';
import { Link } from 'react-router-dom';

const Content = ({ content, singlePost, id }) => (
  <Link to={`/posts/${id}`}>
    <p className="post-content">
      {singlePost ? content : content.length > 300 ? content.slice(0, 300) + '...' : content}
    </p>
  </Link>
);

export default Content;
