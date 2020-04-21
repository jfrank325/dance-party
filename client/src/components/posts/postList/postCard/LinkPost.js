import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkContent from './LinkContent';
import Votes from './Votes';

const LinkPost = ({ post, deletePost }) => {
  const [linkTitle, setlinkTitle] = useState(post.title);
  const [linkImage, setlinkImage] = useState('');
  const [linkContent, setlinkContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [thisPost, setThisPost] = useState(post);

  const { upvote_count, _author, created_at } = thisPost;
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

  const deleteThisPost = () => {
    axios.post(`/api/posts/${id}/delete`);
    deletePost(id);
    // console.log(res);
  };

  return (
    <div className="full-post-container">
      <div className="postcard-container">
        <div className="card-vote-container">
          {/* {props.isLoggedIn ? ( */}
          <div>
            <Votes handleUpvote={handleUpvote} handleDownvote={handleDownvote} id={id} />
          </div>
          <LinkContent
            id={id}
            url={linkUrl}
            title={linkTitle}
            content={linkContent}
            image={linkImage}
            author={_author.username}
            date={created_at}
            upvotes={upvote_count}
            deletePost={deleteThisPost}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkPost;
