import React from 'react';
import NormalPost from './NormalPost';
import LinkPost from './LinkPost';

const PostCard = ({ post, deletePost, index }) => {
  // const [linkTitle, setlinkTitle] = useState('');
  // const [linkImage, setlinkImage] = useState('');
  // const [linkContent, setlinkContent] = useState('');
  // const [linkUrl, setLinkUrl] = useState('');
  // const [thisPost, setThisPost] = useState(post);

  // const id = post._id;

  // useEffect(() => {
  //   const getPreview = async () => {
  //     const res = await axios.post('https://api.linkpreview.net', {
  //       q: post.link,
  //       key: process.env.REACT_APP_LINK_PREVIEW_KEY,
  //     });
  //     setlinkTitle(res.data.title);
  //     setlinkImage(res.data.image);
  //     setlinkContent(res.data.description);
  //     setLinkUrl(res.data.url);
  //     // console.log(res);
  //   };
  //   if (post.link) {
  //     getPreview();
  //   }
  // }, [post.link]);

  // const handleUpvote = async () => {
  //   const res = await axios.post(`/api/posts/${id}/upvote`);
  //   setThisPost(res.data);
  // };

  // const handleDownvote = async () => {
  //   const res = await axios.post(`/api/posts/${id}/upvote`);
  //   setThisPost(res.data);
  // };

  // const { _id, title, link, content, image, video, upvote_count, _author, created_at } = thisPost;

  // console.log('this is the preveiw', link);
  // return !link ? (
  //   <>
  //     <div key={_id} className="postcard-container">
  //       <div>
  //         <Link to={`/posts/${_id}`}>
  //           <b>{title}</b>
  //           <p>{content.slice(0, 20)}...</p>
  //           {image ? <img src={image} alt={title} /> : <> </>}
  //         </Link>
  //         {video ? <video autoPlay loop muted src={video} controls controlsList="nodownload" /> : <> </>}
  //         <span role="img" aria-label="upvote emoji">
  //           {upvote_count}↑
  //         </span>
  //         <Author author={_author.username} />
  //         <span>on {new Date(created_at).toDateString()}</span>
  //         <button
  //           onClick={() => {
  //             deletePost(index);
  //           }}
  //         >
  //           Delete
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // ) : (
  //   <div key={_id} className="postcard-container">
  //     <div>
  //       <a href={linkUrl}>
  //         <b>{linkTitle}</b>
  //         {linkImage ? <img src={linkImage} alt={title} /> : <p>Sorry This Link Isn't Available Right Now</p>}
  //         <p>{linkContent}</p>
  //         <span role="img" aria-label="upvote emoji">
  //           {upvote_count}↑
  //         </span>
  //         <Author author={_author.username} />
  //         <span>on {new Date(created_at).toDateString()}</span>
  //       </a>
  //       <button
  //         onClick={() => {
  //           deletePost(index);
  //         }}
  //       >
  //         Delete
  //       </button>
  //     </div>
  //   </div>
  // );
  return !post.link ? (
    <NormalPost deletePost={deletePost} post={post} index={index} />
  ) : (
    <LinkPost deletePost={deletePost} post={post} index={index} />
    /* <div className="full-post-container">
      <div className="postcard-container">
        <div className="card-vote-container">
          <div>
            {/* {props.isLoggedIn ? ( */
    // <div className="arrow-container">
    //   <button onClick={handleUpvote}>
    //     <img src={upArrow} className="upvote" alt="Up Arrow" />
    //   </button>
    //   <button onClick={handleDownvote}>
    //     <img src={downArrow} className="upvote" alt="Down Arrow" />
    //   </button>
    // </div>
    /* ) : ( */
    /* <Link to="/login">Login to upvote this post</Link> */
    /* )} */
    //     </div>
    //     <div key={_id} className="">
    //       <Link to={`/posts/${_id}`}>
    //         <b>{title}</b>
    //         <p>{content}</p>
    //         <img src={image} alt="" />
    //         {video ? <video autoPlay loop muted src={video} controls controlsList="nodownload" /> : <> </>}
    //       </Link>

    //       <Author author={_author.username} date={new Date(created_at).toDateString()} />
    //       <p>
    //         {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
    //       </p>
    //     </div>
    //   </div>
    // </div>
    // </div>
    // <div className="full-post-container">
    //   <div className="postcard-container">
    //     <div className="card-vote-containter">
    //       {/* {props.isLoggedIn ? ( */}
    //       <div>
    //         <div className="arrow-container">
    //           <button onClick={handleUpvote}>
    //             <img src={upArrow} className="upvote" alt="Up Arrow" />
    //           </button>
    //           <button onClick={handleDownvote}>
    //             <img src={downArrow} className="upvote" alt="Down Arrow" />
    //           </button>
    //         </div>
    //       </div>
    //       <div>
    //         <a href={linkUrl}>
    //           <b>{linkTitle}</b>
    //           {linkImage ? <img src={linkImage} alt={title} /> : <p>Sorry This Link Isn't Available Right Now</p>}
    //           <p>{linkContent}</p>
    //           <span role="img" aria-label="upvote emoji">
    //             {upvote_count}↑
    //           </span>
    //           <Author author={_author.username} date={new Date(created_at).toDateString()} />
    //           <p>
    //             {upvote_count} {upvote_count === 1 ? 'Upvote' : 'Upvotes'}
    //           </p>
    //         </a>
    //         <button
    //           onClick={() => {
    //             deletePost(index);
    //           }}
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PostCard;
