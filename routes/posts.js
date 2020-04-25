const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Comments = require('../models/Comments');
const uploadCloud = require('../config/cloudinary');
const url = require('url');

/* Here we'll write the routes for the posts */

router.get('/posts', (req, res) => {
  // let sort = {};
  // if (req.query.sortBy) {
  //   sort[req.query.sortBy] = -1;
  // } else {
  //   sort.upvote_count = -1;
  // }
  // if (req.query.sortBy) {
  //   sort = { [req.query.sortBy]: -1 };
  // } else {
  //   sort = { created_at: -1 };
  // }

  Post.find()
    // .sort(sort)
    .populate('_author')
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
    .populate('comments')
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

  const { title, type, content, link, image, video, url } = req.body;

  Post.create({
    title: title,
    type: type,
    link: link,
    content: content,
    image: image,
    video: video,
    url: url,
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

router.post('/posts/:id/comments', (req, res, next) => {
  const message = req.body.message;
  const postId = req.params.id;
  const author = req.user.id;

  Comments.create({
    message,
    author,
  })
    .then((commentDocument) => {
      const commentId = commentDocument._id;
      return Post.updateOne({ _id: postId }, { $push: { comments: commentId } });
    })
    .then(() => {
      res.json({});
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/posts/:id/comments', (req, res, next) => {
  Post.findById(req.params.id)
    .populate({
      path: 'comments',
      // populate: {
      //   path: '_author',
      // },
    })
    .then((post) => {
      const comments = post.comments.map((comment) => {
        return {
          message: comment.message,
          // author: comment._author.username,
        };
      });
      res.json(comments);
    })
    .catch((err) => {
      next(err);
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

router.post('/posts/:id/save', (req, res, next) => {
  const postId = req.params.id;
  const user = req.user.id;

  User.updateOne({ _id: user }, { $addToSet: { _savedposts: postId } })
    .exec()
    .then((res) => {
      res.json({ message: 'saved' });
    })
    .catch((err) => {
      console.log(err);
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


router.post('/posts/:id/delete', (req, res) => {
  const query = { _id: req.params.id };
  Post.deleteOne(query)
    .then((res) => {
      res.json({ message: 'deleted' });
    })
    .catch((err) => {
      console.log(err);
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
