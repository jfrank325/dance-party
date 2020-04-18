import React from 'react';

const CommentForm = () => {
  return (
    <div>
      {' '}
      <form onSubmit={handleSubmit}></form>
      <label htmlFor="comment">Comment</label>
      <input name="comment" value={state.comment} onChange={handleChange} type="text" />
    </div>
  );
};

export default CommentForm;
