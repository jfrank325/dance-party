import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkContent from './LinkContent';
import Votes from './Votes';

const LinkPost = ({ post, deletePost, user }) => {
  const [linkTitle, setlinkTitle] = useState(post.title);
  const [linkImage, setlinkImage] = useState('');
  const [linkContent, setlinkContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [thisPost, setThisPost] = useState(post);

  const { upvote_count, _author, created_at } = thisPost;
  const id = post._id;

  const handleUpvote = async () => {
    if (user) {
      const res = await axios.post(`/api/posts/${id}/upvote`);
      setThisPost(res.data);
    }
  };

  const handleDownvote = async () => {
    if (user) {
      const res = await axios.post(`/api/posts/${id}/upvote`);
      setThisPost(res.data);
    }
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
    };
    if (post.link) {
      getPreview();
    }
  }, [post.link]);

  // useEffect(() => {
  //   axios
  //     .post('/api/posts', {
  //       title: linkTitle,
  //       content: linkContent,
  //       image: linkImage,
  //       url: linkUrl,
  //       _author: post.author,
  //     })
  //     .then(() => {
  //       console.log('posted link data');
  //     });
  // }, [linkUrl, linkContent, linkImage, linkTitle]);

  const deleteThisPost = () => {
    if (user._id === _author._id) {
      axios.post(`/api/posts/${id}/delete`);
      deletePost(id);
    }
  };

  const saveThisPost = () => {
    axios.post(`/api/posts/${id}/save`);
  };

  return (
    <div className="full-post-container">
      <div className="postcard-container">
        <div className="card-vote-container">
          <div>
            <Votes handleUpvote={handleUpvote} handleDownvote={handleDownvote} id={id} />
          </div>
          <LinkContent
            id={id}
            url={linkUrl}
            title={linkTitle}
            content={linkContent}
            image={linkImage}
            author={_author}
            date={created_at}
            upvotes={upvote_count}
            deletePost={deleteThisPost}
            savePost={saveThisPost}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkPost;
