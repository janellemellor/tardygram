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

  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment
      .findByIdAndDelete({
        _id: req.params.id, 
        commentBy: req.user._id
      })
      .then(comment => res.send(comment))
      .catch(next);
  });





