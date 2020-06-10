import React from 'react';
import { Link } from 'react-router-dom';

const Content = ({ content, singlePost, id }) => (
  <Link to={`/posts/${id}`}>
    <pre className="post-content">
      {singlePost ? content : content.length > 300 ? content.slice(0, 500) + '...' : content}
    </pre>
  </Link>
);

export default Content;
