import React from 'react';
import Author from '../../postDetail/Author';

const LinkContent = ({ deletePost, ...props }) => {
  const { _id, url, title, content, image, author, date, upvotes } = props;
  return (
    <div>
      <a href={url}>
        <b>{title}</b>
        {image ? <img src={image} alt={title} /> : <p>Sorry This Link Isn't Available Right Now</p>}
        <p>{content}</p>
        <Author author={author} date={new Date(date).toDateString()} />
        <p>
          {upvotes} {upvotes === 1 ? 'Upvote' : 'Upvotes'}
        </p>
      </a>
      <button onClick={() => deletePost(_id)}>Delete</button>
    </div>
  );
};

export default LinkContent;
