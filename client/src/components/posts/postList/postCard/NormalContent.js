import React from 'react';
import { Link } from 'react-router-dom';
import Author from '../../postDetail/Author';

const NormalContent = ({ post }) => {
  const { _id, title, content, image, video, _author, created_at, upvote_count } = post;
  return (
    <div key={_id} className="">
      <Link to={`/posts/${_id}`}>
        <b>{title}</b>
        <p>{content}</p>
        <img src={image} alt="" />
        {video ? <video autoPlay loop muted src={video} controls controlsList="nodownload" /> : <> </>}
      </Link>

      <Author author={_author.username} date={new Date(created_at).toDateString()} />
      <p>
        {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
      </p>
    </div>
  );
};

export default NormalContent;
