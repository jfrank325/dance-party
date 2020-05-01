import React from 'react';
import upArrow from '../../../images/UpArrow.jpg';
import downArrow from '../../../images/DownArrow.jpg';

const Votes = ({ id, handleDownvote, handleUpvote }) => (
  <div className="arrow-container">
    <button onClick={() => handleUpvote(id)}>
      <img src={upArrow} className="upvote" alt="Up Arrow" />
    </button>
    <button onClick={() => handleDownvote(id)}>
      <img src={downArrow} className="upvote" alt="Down Arrow" />
    </button>
  </div>
);

export default Votes;
