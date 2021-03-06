const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Comments = require('../models/Comments');
const uploadCloud = require('../config/cloudinary');
const url = require('url');

const loginCheck = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/posts', (req, res) => {
  let sort = {};
  if (req.query.sortBy) {
    sort[req.query.sortBy] = -1;
  } else {
    sort.upvote_count = -1;
  }
  // if (req.query.sortBy) {
  //   sort = { [req.query.sortBy]: -1 };
  // } else {
  //   sort = { created_at: -1 };
  // }

  Post.find()
    .sort(sort)
    // .populate('comments.author')
    .populate('_author')
    .populate({ path: 'comments', ref: 'author', populate: { path: 'author', model: 'User' } })
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

router.get('/posts/newest', (req, res) => {
  Post.find()
    .populate('_author')
    .populate({ path: 'comments', ref: 'author', populate: { path: 'author', model: 'User' } })
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

router.get('/posts/authored/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .populate('_posts')
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .populate('_author')
    .populate({ path: 'comments', ref: 'author', populate: { path: 'author', model: 'User' } })
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
      const postId = postDocument._id;
      res.json(postDocument);
      User.updateOne({ _id: req.user._id }, { $push: { _posts: postId } }).exec();
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/posts/:id/comments', loginCheck, (req, res) => {
  const message = req.body.message;
  const post = req.params.id;
  const author = req.user.id;

  Comments.create({
    message,
    author,
    post,
  })
    .then((commentDocument) => {
      const commentId = commentDocument._id;
      Post.updateOne({ _id: post }, { $push: { comments: commentId } }).exec();
      User.updateOne({ _id: author }, { $push: { _comments: commentId } }).exec();
    })
    .then(() => {
      res.json({});
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get('/posts/:id/comments', loginCheck, (req, res) => {
  Post.findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
      },
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

router.post('/posts/:id/save', (req, res, next) => {
  const postId = req.params.id;
  const user = req.user.id;

  User.updateOne({ _id: user }, { $addToSet: { _savedposts: postId } })
    .exec()
    .then((res) => {
      res.json({ message: 'saved' });
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
