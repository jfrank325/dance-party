import React from 'react';

const ProfileSort = ({ getUserPosts, getUpVoted }) => (
  <div className="">
    <button className="sort-button" onClick={getUserPosts}>
      Your Posts
    </button>{' '}
    <button className="sort-button" onClick={getUpVoted}>
      Posts You've Upvoted
    </button>
  </div>
);

export default ProfileSort;
