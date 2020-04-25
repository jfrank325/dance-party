import React from 'react';

const ProfileSort = ({ getUserPosts, getUpVoted, getSaved }) => (
  <div className="">
    <button className="sort-button" onClick={getUserPosts}>
      Yours
    </button>{' '}
    <button className="sort-button" onClick={getSaved}>
      Saved
    </button>
    <button className="sort-button" onClick={getUpVoted}>
      Upvoted
    </button>
  </div>
);

export default ProfileSort;
