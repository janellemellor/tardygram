const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Post
      .create({ ...req.body, user: req.user._id })
      .then(post => res.send(post))
      .catch(next);
  });
  

// * `POST /posts`
// * requires authentication
// * creates a new post
// * responds with the new post
// * HINT: get the user who created the post from `req.user`.
// * `GET /posts`
// * responds with a list of posts
// * `GET /posts/:id`
// * responds with a post by id
// * should include the populated user
// * should include all comments associated with the post (populated with commenter)
//   * HINT: You'll need to make two separate queries and a `Promise.all`
// * `PATCH /posts/:id`
// * requires authentication
// * only can update the post caption
// * respond with the updated post
// * NOTE: make sure the user attempting to update the post owns it
// * `DELETE /posts/:id`
// * requires authentication
// * deletes a post
// * responds with the deleted post
// * NOTE: make sure the user attempting to delete the post owns it
// * `GET /posts/popular`
// * respond with a list of the 10 posts with the most comments