import React from 'react';

const Content = ({ text, type }) =>
  type === 'link' ? (
    <h3>
      <a href={text}>{text}</a>
    </h3>
  ) : (
    <h3>{text}</h3>
  );
export default Content;
