import React from 'react';
import { Link } from 'react-router-dom';

const Comments = (props) => {
  const { handleSubmit, handleChange, comments, message, showComments, toggleShowComments } = props;
  return (
    <div className="comments-container">
      <h3>Comments</h3>
      {showComments
        ? comments.map((comment) => (
            <div key={comment._id} style={{ marginBottom: '12px' }}>
              <p>
                {comment.message}
                {'  '}
                <span style={{ color: 'deepskyblue' }}>
                  {comment.author && (
                    <Link to={`/posts/authored/${comment.author._id}`}>-{comment.author.username}</Link>
                  )}
                </span>
              </p>
            </div>
          ))
        : comments.slice(0, 5).map((comment) => (
            <div key={comment._id} style={{ marginBottom: '12px' }}>
              <p>
                {comment.message}
                {'   '}
                <span style={{ color: 'deepskyblue' }}>
                  {comment.author && (
                    <Link to={`/posts/authored/${comment.author._id}`}>-{comment.author.username}</Link>
                  )}
                </span>
              </p>
            </div>
          ))}
      {showComments ? (
        <button onClick={toggleShowComments}>Hide Comments</button>
      ) : (
        <button onClick={toggleShowComments} style={{ color: 'deepskyblue' }}>
          ...
        </button>
      )}
      <form onSubmit={handleSubmit}>
        <input className="comment-input" name="comment" value={message} onChange={handleChange} type="text" />
      </form>
    </div>
  );
};

export default Comments;
