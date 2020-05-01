import React from 'react';

const ProfileSort = ({ getUserPosts, getUpVoted, getSaved, commented }) => (
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
    <button className="sort-button" onClick={commented}>
      Commented
    </button>
  </div>
);

export default ProfileSort;
