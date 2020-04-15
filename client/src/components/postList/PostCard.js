import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Author from '../postDetail/Author';
import axios from 'axios';

const PostCard = ({ post }) => {
  const [linkTitle, setlinkTitle] = useState('');
  const [linkImage, setlinkImage] = useState('');
  const [linkContent, setlinkContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    const getPreview = async () => {
      const res = await axios.post('https://api.linkpreview.net', {
        q: post.link,
        key: 'd14e27307cc7630318cab10d757365c4',
      });
      setlinkTitle(res.data.title);
      setlinkImage(res.data.image);
      setlinkContent(res.data.description);
      setLinkUrl(res.data.url);
      console.log(res);
    };
    if (post.link) {
      getPreview();
    }
  }, [post.link]);

  // console.log('this is the preveiw', link);
  return !post.link ? (
    <div key={post._id} className="postcard-container">
      <Link to={`/posts/${post._id}`}>
        <div>
          <b>{post.title}</b>
          <p>{post.content.slice(0, 20)}...</p>
          <Author author={post._author.username} />
        </div>
      </Link>
    </div>
  ) : (
    <>
      <div>
        <a href={linkUrl}>
          <b>{linkTitle}</b>
          <img src={linkImage} alt="link" />
          <p>{linkContent}</p>
          )}
          <span role="img" aria-label="upvote emoji">
            {post.upvote_count}⏫
          </span>
        </a>
      </div>
    </>
  );
};

export default PostCard;
