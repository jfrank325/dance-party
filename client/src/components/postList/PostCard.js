import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Author from '../postDetail/Author';
import axios from 'axios';

const PostCard = ({ post }) => {
  const [linkTitle, setlinkTitle] = useState(null);
  const [linkImage, setlinkImage] = useState(null);
  const [linkContent, setlinkContent] = useState(null);

  useEffect(() => {
    const getPreview = async () => {
      const res = await axios.post('https://api.linkpreview.net', {
        q: post.link,
        key: 'd14e27307cc7630318cab10d757365c4',
      });
      setlinkTitle(res.data.title);
      setlinkImage(res.data.image);
      setlinkContent(res.data.description);
      console.log(res);
    };
    if (post.link) {
      getPreview();
    }
  }, [post.link]);

  // console.log('this is the preveiw', link);
  return (
    <div key={post._id} className="postcard-container">
      <Link to={`/posts/${post._id}`}>
        {!post.link ? (
          <div>
            <b>{post.title}</b>
            <p>{post.content.slice(0, 20)}...</p>
            <Author author={post._author.username} />
          </div>
        ) : (
          <div>
            <b>{linkTitle}</b>
            <img src={linkImage} alt="link" />
            <p>{linkContent}</p>
          </div>
        )}
        <span role="img" aria-label="upvote emoji">
          {post.upvote_count}⏫
        </span>
      </Link>
    </div>
  );
};

export default PostCard;
