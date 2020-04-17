import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Author from '../postDetail/Author';
import axios from 'axios';

const PostCard = ({ post, deletePost, index }) => {
  const [linkTitle, setlinkTitle] = useState('');
  const [linkImage, setlinkImage] = useState('');
  const [linkContent, setlinkContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    const getPreview = async () => {
      const res = await axios.post('https://api.linkpreview.net', {
        q: post.link,
        key: process.env.REACT_APP_LINK_PREVIEW_KEY,
      });
      setlinkTitle(res.data.title);
      setlinkImage(res.data.image);
      setlinkContent(res.data.description);
      setLinkUrl(res.data.url);
      // console.log(res);
    };
    if (post.link) {
      getPreview();
    }
  }, [post.link]);

  const { _id, title, link, content, image, video, upvote_count, _author, created_at } = post;

  // console.log('this is the preveiw', link);
  return !link ? (
    <>
      <div key={_id} className="postcard-container">
        <div>
          <Link to={`/posts/${_id}`}>
            <b>{title}</b>
            <p>{content.slice(0, 20)}...</p>
            {image ? <img src={image} alt={title} /> : <> </>}
          </Link>
          {video ? <video autoPlay loop muted src={video} controls /> : <> </>}
          <span role="img" aria-label="upvote emoji">
            {upvote_count}↑
          </span>
          <Author author={_author.username} />
          <span>on {new Date(created_at).toDateString()}</span>
          <button
            onClick={() => {
              deletePost(index);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  ) : (
    <div key={_id} className="postcard-container">
      <div>
        <a href={linkUrl}>
          <b>{linkTitle}</b>
          {linkImage ? <img src={linkImage} alt={title} /> : <p>Sorry This Link Isn't Available Right Now</p>}
          <p>{linkContent}</p>
          <span role="img" aria-label="upvote emoji">
            {upvote_count}↑
          </span>
          <Author author={_author.username} />
          <span>on {new Date(created_at).toDateString()}</span>
        </a>
        <button
          onClick={() => {
            deletePost(index);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
