import React from 'react';

const ProfileSort = ({ getUserPosts, getUpVoted, getSaved, getCommented }) => (
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
    <button className="sort-button" onClick={getCommented}>
      Commented
    </button>
  </div>
);

export default ProfileSort;
