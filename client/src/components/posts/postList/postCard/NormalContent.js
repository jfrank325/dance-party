import React from 'react';
import { Link } from 'react-router-dom';
import Author from '../../postDetail/Author';
import Save from '../../../../images/SaveFlag.png';
import Bin from '../../../../images/Bin.png';

const NormalContent = ({ deletePost, savePost, ...props }) => {
  const { id, title, content, image, video, author, createdAt, upvoteCount } = props;

  return (
    <div key={id} className="post-content">
      <Link to={`/posts/${id}`}>
        <div className="title-container">
          <b>
            {title.slice(0, 40)}
            {title.length > 41 && '...'}
          </b>
          <Author
            author={author.username}
            date={new Date(createdAt).toDateString()}
            time={new Date(createdAt).toTimeString().slice(0, 8)}
          />
        </div>
        <img src={image} alt="" />
        {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />}
        <p>
          {content.slice(0, 100)}
          {content.length > 101 && '...'}
        </p>
      </Link>
      <div className="bottom-content-container">
        <p>
          {upvoteCount} {upvoteCount === 1 ? 'Upvote' : 'Upvotes'}
        </p>
        <div className="delete-save-container">
          <button className="image-button" onClick={() => deletePost(id)}>
            <img style={{ width: '30px' }} src={Bin} alt="delete" />
          </button>
          <button className="image-button" onClick={() => savePost(id)}>
            <img style={{ width: '50px' }} src={Save} alt="Save" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NormalContent;
