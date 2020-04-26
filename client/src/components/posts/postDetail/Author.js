import React from 'react';
import { Link } from 'react-router-dom';

const Author = ({ id, author, date, time }) => {
  const today = new Date().toDateString();

  console.log('author', author);

  return (
    <p>
      Posted by{' '}
      <span style={{ color: 'deepskyblue' }}>
        <Link to={`/posts/authored/${author._id}`}>{author.username}</Link>
      </span>{' '}
      {date === today ? `at ${time}` : `on ${date}`}
    </p>
  );
};

export default Author;

// date={new Date(date).toDateString()}
