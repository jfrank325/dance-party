import React from 'react';

const CommentForm = () => (
  <div className="comment-container">
     <h3 style={{ color: 'coral' }}>Comments</h3>
            {showComments
              ? comments.map((comment, index) => (
                  <div>
                    <p key={index}>{comment.message}</p>
                  </div>
                ))
              : comments.slice(0, 2).map((comment, index) => (
                  <div>
                    <p key={index}>{comment.message}</p>
                  </div>
                ))}
            <form onSubmit={handleSubmit}>
              <input name="comment" value={message} onChange={(text) => setMessage(text.target.value)} type="text" />
            </form>
            {showComments ? (
              <button onClick={toggleShowComments}>Hide Comments</button>
            ) : (
              <button onClick={toggleShowComments} style={{ color: 'deepskyblue' }}>
                ...
              </button>
            )}
  </div>
);

export default CommentForm;
