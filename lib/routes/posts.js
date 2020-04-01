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
    // Promise.all([
    Post
      .findById(req.params.id)
      .populate('user')
      .then(post => res.send(post))
      .catch(next);
    // ])
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Post
      .findOneAndUpdate({
        _id: req.params.id, 
        user: req.user._id
      }, { caption: req.body.caption }, { new: true })
      .then(post => res.send(post))
      .catch(next);  
  });

// * `PATCH /posts/:id`
// * requires authentication
// * only can update the post caption
// * respond with the updated post
// * NOTE: make sure the user attempting to update the post owns it



// UPDATE `GET /posts/:id`
//  include all comments associated with the post (populated with commenter)
//     * HINT: You'll need to make two separate queries and a `Promise.all





// * `DELETE /posts/:id`
// * requires authentication
// * deletes a post
// * responds with the deleted post
// * NOTE: make sure the user attempting to delete the post owns it
// * `GET /posts/popular`
// * respond with a list of the 10 posts with the most comments