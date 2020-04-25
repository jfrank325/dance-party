import React from 'react';

const Author = ({ author, date, time }) => {
  const today = new Date().toDateString();

  return (
    <p>
      Posted by <span style={{ color: 'deepskyblue' }}>{author}</span> {date === today ? `at ${time}` : `on ${date}`}
    </p>
  );
};

export default Author;

// date={new Date(date).toDateString()}
