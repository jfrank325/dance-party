import React from 'react';

const Sort = ({ sortByNewest, sortByUpvotes, sortByCommentCount }) => {
  return (
    <div className="">
      <button className="sort-button" onClick={sortByNewest}>
        Newest
      </button>{' '}
      <button className="sort-button" onClick={sortByUpvotes}>
        Upvotes
      </button>
      <button className="sort-button" onClick={sortByCommentCount}>
        Comments
      </button>
    </div>
  );
};

export default Sort;
