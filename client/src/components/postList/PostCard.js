import React from 'react';
import { Link } from 'react-router-dom';
import Author from '../postDetail/Author';

const PostCard = ({ post }) => {
  console.log(post, 'from postcard');
  return (
    <div>
      {' '}
      <div key={post._id}>
        <b>
          <Link to={`/posts/${post._id}`}> {post.title} </Link>
          <p>{post.content.slice(0, 20)}...</p>
          <Author author={post._author.username} />
        </b>
        <span role="img" aria-label="upvote emoji">
          {post.upvote_count}⏫
        </span>
      </div>
    </div>
  );
};

export default PostCard;
