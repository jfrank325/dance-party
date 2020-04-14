import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div>
      {' '}
      <p key={post._id}>
        <b>
          <Link to={`/posts/${post._id}`}> {post.title} </Link>
        </b>
        <span role="img" aria-label="upvote emoji">
          ⏫{post.upvote_count}
        </span>
      </p>
    </div>
  );
};

export default PostCard;
