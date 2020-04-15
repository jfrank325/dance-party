import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ refresh }) => {
  const [state, setState] = useState({
    title: '',
    content: '',
    link: '',
    type: 'text',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Form submitted');

    axios
      .post('/api/posts', {
        title: state.title,
        type: state.type,
        link: state.link,
        content: state.content,
      })
      .then(() => {
        console.log('Response received, calling getData in <Posts/>');
        refresh();
        setState({ ...state, title: '', content: '', link: '', type: 'text' });
      });
  };

  const { title, content, type, link } = state;

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" value={title} onChange={handleChange} />
      <label htmlFor="link">Link</label>
      <input id="link" name="link" value={link} onChange={handleChange} />
      <label htmlFor="content">Content</label>
      <input id="content" name="content" value={content} onChange={handleChange} />
      <label htmlFor="type">Type</label>
      <select value={type} name="type" onChange={handleChange}>
        <option value="link">Link</option>
        <option value="text">Text</option>
      </select>
      <button>New Post</button>
    </form>
  );
};

export default PostForm;
