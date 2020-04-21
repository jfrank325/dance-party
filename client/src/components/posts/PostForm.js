import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ refresh }) => {
  const [state, setState] = useState({
    title: '',
    content: '',
    link: '',
    type: 'text',
    image: '',
    video: '',
    url: '',
    loading: 'false',
  });

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gagwud8b');
    setState({ ...state, loading: true });

    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setState({ ...state, image: file.secure_url, loading: false });
  };

  const uploadVideo = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gagwud8b');
    setState({ ...state, loading: true });
    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/video/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setState({ ...state, video: file.secure_url, loading: false });
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
        video: state.video,
        url: state.url,
      })
      .then(() => {
        console.log('Response received, calling getData in <Posts/>');
        refresh();
        setState({ ...state, title: '', content: '', link: '', type: 'text' });
      });
  };

  const { title, content, link } = state;

  return (
    <form className="create-post" encType="multipart/form-data" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" value={title} onChange={handleChange} />
      <label htmlFor="link">Link</label>
      <input id="link" name="link" value={link} onChange={handleChange} />
      <label htmlFor="content">Content</label>
      <input id="content" name="content" value={content} onChange={handleChange} />
      {/* <label htmlFor="type">Type</label> */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="imgPath">Upload Image</label>
        <input type="file" name="imgPath" onChange={uploadImage} />
        <label htmlFor="videoPath">Upload Video</label>
        <input type="file" name="videoPath" onChange={uploadVideo} />
        {state.loading && state.title ? <div className="donut"></div> : <h4>Finished</h4>}
      </div>
      {/* <select value={type} name="type" onChange={handleChange}>
        <option value="link">Link</option>
        <option value="text">Text</option>
      </select> */}
      <button className="button" style={{ margin: '2rem auto 0 auto' }} onClick={refresh}>
        Submit Post
      </button>
    </form>
  );
};

export default PostForm;
