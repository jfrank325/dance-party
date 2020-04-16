const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const uploadCloud = require('../config/cloudinary');
const url = require('url');

/* Here we'll write the routes for the posts */

router.get('/posts', (req, res) => {
  let sort = {};
  // if (req.query.sortBy) {
  //   sort[req.query.sortBy] = -1;
  // } else {
  //   sort.upvote_count = -1;
  // }
  if (req.query.sortBy) {
    sort = { [req.query.sortBy]: -1 };
  } else {
    sort = { upvote_count: -1 };
  }

  Post.find()
    .sort(sort)
    .limit(30)
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

// router.get('/posts', (req,res) => {
//   let sort = {};
//   if(req.query.sortBy)
// })

router.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .populate('_author')
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/posts', (req, res) => {
  // Todo: add a middleware to protect this route from non-logged in users
  // const defaultMealImage = 'https://res.cloudinary.com/dv1aih6td/image/upload/v1581345429/Meals/thai_zsh0bk.jpg';

  const { title, type, content, link, image, video } = req.body;

  Post.create({
    title: title,
    type: type,
    link: link,
    content: content,
    image: image,
    video: video,
    upvote_count: 0,
    _author: req.user._id,
  })
    .then((postDocument) => {
      res.json(postDocument);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/posts/:id/upvote', (req, res) => {
  const postId = req.params.id;

  const isUpvoted = req.user._upvotes.find((id) => {
    return id.toString() === postId;
  });

  let incr = 1;
  if (isUpvoted) {
    incr = -1;
    User.updateOne({ _id: req.user._id }, { $pull: { _upvotes: postId } }).exec();
  } else {
    User.updateOne({ _id: req.user._id }, { $addToSet: { _upvotes: postId } }).exec();
  }

  Post.findByIdAndUpdate(postId, { $inc: { upvote_count: incr } }, { new: true })
    .populate('_author')
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/posts/:id/upvote', (req, res) => {
  const postId = req.params.id;

  const isDownvoted = req.user._upvotes.find((id) => {
    return id.toString() === postId;
  });

  let decr = -1;
  if (isDownvoted) {
    decr = 1;
    User.updateOne({ _id: req.user._id }, { $pull: { _upvotes: postId } }).exec();
  } else {
    User.updateOne({ _id: req.user._id }, { $addToSet: { _upvotes: postId } }).exec();
  }

  Post.findByIdAndUpdate(postId, { $inc: { upvote_count: decr } }, { new: true })
    .populate('_author')
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

// router.delete("/posts/:id/upvote", (req, res) => {
//   const postId = req.params.id;

//   Post.findByIdAndUpdate(postId, { $inc: { upvote_count: -1 } }, { new: true })
//     .then(post => {
//       res.json(post);
//     })
//     .catch(err => {
//       res.status(500).json({
//         message: err.message
//       });
//     });
// });

module.exports = router;
