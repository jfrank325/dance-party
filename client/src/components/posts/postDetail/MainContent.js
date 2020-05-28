import React from 'react';
import { Link } from 'react-router-dom';

const MainContent = ({ id, title, image, video }) => (
  <Link to={`/posts/${id}`}>
    <b>{title}</b>
    <img className="content-img" src={image} alt="" />
    {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />}
  </Link>
);

export default MainContent;
