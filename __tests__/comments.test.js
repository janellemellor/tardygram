const { getAgent, getUser, getComment, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('comment routes', () => {
  it('creates a comment', async() => {
    const user = await getUser({ username: 'fakeUser' });
     
    return getAgent()
      .post('/api/v1/comments')
      .send({ 
        commentBy: user._id,
        post: post._id,
        comment: 'comment'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          commentBy: user._id,
          post: post._id,
          comment: 'comment',
          __v: 0  
        });
      });
  });

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