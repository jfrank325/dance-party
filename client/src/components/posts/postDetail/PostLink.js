import React from 'react';

const PostLink = ({ postLink }) => (
  <div className="post-link">
    <a href={postLink} rel="noreferrer noopener" target="_blank">
      <p>{postLink}</p>
    </a>
  </div>
);

export default PostLink;
