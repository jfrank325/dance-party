import React from 'react';

const Content = ({ content, singlePost }) => (
  <p className="post-content">
    {singlePost ? content : content.length > 300 ? content.slice(0, 300) + '...' : content}
  </p>
);

export default Content;
