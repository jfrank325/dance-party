import React from 'react';
import { Link } from 'react-router-dom';
import Author from '../postDetail/Author';

const PostCard = ({ post }) => {
  console.log(post, 'from postcard');
  return (
    <div key={post._id} className="postcard-container">
      <Link to={`/posts/${post._id}`}>
        <b>{post.title}</b>
        <p>{post.content.slice(0, 20)}...</p>
        <Author author={post._author.username} />
        <span role="img" aria-label="upvote emoji">
          {post.upvote_count}⏫
        </span>
      </Link>
    </div>
  );
};

export default PostCard;
