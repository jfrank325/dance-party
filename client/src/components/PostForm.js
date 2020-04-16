import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ refresh }) => {
  const [state, setState] = useState({
    title: '',
    content: '',
    link: '',
    type: 'text',
    image: '',
  });

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gagwud8b');
    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setState({ ...state, image: file.secure_url });
  };

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
        image: state.image,
      })
      .then(() => {
        console.log('Response received, calling getData in <Posts/>');
        refresh();
        setState({ ...state, title: '', content: '', link: '', type: 'text' });
      });
  };

  const { title, content, type, link, image } = state;

  return (
    <form className="create-post" encType="multipart/form-data" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" value={title} onChange={handleChange} />
      <label htmlFor="link">Link</label>
      <input id="link" name="link" value={link} onChange={handleChange} />
      <label htmlFor="content">Content</label>
      <input id="content" name="content" value={content} onChange={handleChange} />
      <label htmlFor="type">Type</label>
      <div>
        <input type="file" name="imgPath" onChange={uploadImage} />
        {/* <input type="submit" value="SAVE" /> */}
      </div>
      {/* <select value={type} name="type" onChange={handleChange}>
        <option value="link">Link</option>
        <option value="text">Text</option>
      </select> */}
      <button onClick={refresh}>New Post</button>
    </form>
  );
};

export default PostForm;
