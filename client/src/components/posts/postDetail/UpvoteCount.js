import React from 'react';

const UpvoteCount = ({ upvote_count }) => (
  <p>
    <span style={{ color: 'var(--sky)' }}>{upvote_count}</span> {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
  </p>
);

export default UpvoteCount;
