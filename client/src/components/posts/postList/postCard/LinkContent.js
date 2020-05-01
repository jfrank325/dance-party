// import React from 'react';
// import { Link } from 'react-router-dom';
// import Author from '../../postDetail/Author';
// import Save from '../../../../images/SaveFlag.png';
// import Bin from '../../../../images/Bin.png';

// const LinkContent = ({ deletePost, savePost, ...props }) => {
//   const { id, url, title, content, image, author, date, upvotes } = props;
//   return (
//     <div className="post-content">
//       <Link to={`/posts/${id}`}>
//         <div className="title-container">
//           <b>
//             {title.slice(0, 40)}
//             {title.length > 41 && '...'}
//           </b>
//           <Author
//             author={author}
//             date={new Date(date).toDateString()}
//             time={new Date(date).toTimeString().slice(0, 8)}
//           />
//         </div>
//       </Link>
//       <a href={url} rel="noreferrer noopener" target="_blank">
//         {image ? <img src={image} alt={title} /> : <p>Sorry This Link Isn't Available Right Now</p>}
//         <p>
//           {' '}
//           {content.slice(0, 100)}
//           {content.length > 101 && '...'}
//         </p>
//       </a>
//       <div className="bottom-content-container">
//         <p>
//           {upvotes} {upvotes === 1 ? 'Upvote' : 'Upvotes'}
//         </p>
//         <div className="delete-save-container">
//           <button onClick={() => deletePost(id)}>
//             <img style={{ width: '30px' }} src={Bin} alt="delete" />
//           </button>
//           <button onClick={() => savePost(id)}>
//             <img style={{ width: '50px' }} src={Save} alt="Save" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LinkContent;
