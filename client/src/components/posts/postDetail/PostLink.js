import React from 'react';

const PostLink = ({ postLink }) => (
  <div className="post-link">
    <a href={postLink} rel="noreferrer noopener" target="_blank">
      <p style={{ width: '5rem' }}>{postLink.slice(0, 30)}...</p>
    </a>
  </div>
);

export default PostLink;
