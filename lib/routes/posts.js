const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Post
      .create({ ...req.body, user: req.user._id })
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Post
      .find()
      .then(posts => res.send(posts))
      .catch(next);  
  })

  .get('/:id', (req, res, next) => {
    Post
      .findById(req.params.id)
      .populate('user')
      .populate({
        path: 'comments', 
        select: 'commentBy post comment',
        populate: {
          path: 'commentBy', 
          select: 'username'
        }
      })
      .then(post => res.send(post))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Post
      .findOneAndUpdate({
        _id: req.params.id, 
        user: req.user._id
      }, { caption: req.body.caption }, { new: true })
      .then(post => res.send(post))
      .catch(next);  
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .findOneAndDelete({
        _id: req.params.id, 
        user: req.user._id
      })
      .then(post => res.send(post))
      .catch(next);
  });


// UPDATE `GET /posts/:id`
//  include all comments associated with the post (populated with commenter)
//     * HINT: You'll need to make two separate queries and a `Promise.all


// * `GET /posts/popular`
// * respond with a list of the 10 posts with the most comments