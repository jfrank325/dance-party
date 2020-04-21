import React, { useState, useEffect } from 'react';
import axios from 'axios';
import upArrow from '../../../images/UpArrow.jpg';
import downArrow from '../../../images/DownArrow.jpg';
import Author from '../../postDetail/Author';

const LinkPost = ({ post, deletePost }) => {
  const [linkTitle, setlinkTitle] = useState('');
  const [linkImage, setlinkImage] = useState('');
  const [linkContent, setlinkContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [thisPost, setThisPost] = useState(post);

  const { title, upvote_count, _author, created_at } = thisPost;
  const id = post._id;

  const handleUpvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setThisPost(res.data);
  };

  const handleDownvote = async () => {
    const res = await axios.post(`/api/posts/${id}/upvote`);
    setThisPost(res.data);
  };

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
  return (
    <div className="full-post-container">
      <div className="postcard-container">
        <div className="card-vote-containter">
          {/* {props.isLoggedIn ? ( */}
          <div>
            <div className="arrow-container">
              <button onClick={handleUpvote}>
                <img src={upArrow} className="upvote" alt="Up Arrow" />
              </button>
              <button onClick={handleDownvote}>
                <img src={downArrow} className="upvote" alt="Down Arrow" />
              </button>
            </div>
          </div>
          <div>
            <a href={linkUrl}>
              <b>{linkTitle}</b>
              {linkImage ? <img src={linkImage} alt={title} /> : <p>Sorry This Link Isn't Available Right Now</p>}
              <p>{linkContent}</p>
              <Author author={_author.username} date={new Date(created_at).toDateString()} />
              <p>
                {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
              </p>
            </a>
            {/* <button
              onClick={() => {
                deletePost(index);
              }}
            >
              Delete
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPost;
