const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Comment
      .create({ ...req.body, user: req.user._id })
      .then(comment => res.send(comment))
      .catch(next);
  })




// POST /comments
// requires authentication
// create a new comment
// respond with the comment
// HINT: get the user who created the comment from req.user.
// DELETE /comments/:id
// requires authentication
// delete a comment by id
// respond with the deleted comment
// NOTE: make sure the user attempting to delete the comment owns it
