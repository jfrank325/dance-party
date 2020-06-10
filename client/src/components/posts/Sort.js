import React from 'react';

const Sort = ({ sortByNewest, sortByUpvotes, sortByCommentCount }) => (
  <div className="">
    <button className="sort-button" onClick={sortByNewest}>
      Newest
    </button>{' '}
    <button className="sort-button" onClick={sortByUpvotes}>
      Upvoted
    </button>
    <button className="sort-button" onClick={sortByCommentCount}>
      Commented
    </button>
  </div>
);

export default Sort;
