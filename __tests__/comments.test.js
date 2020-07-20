const { getAgent, getUser, getPost, getComment } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('comment routes', () => {
  it('creates a comment', async() => {
    const user = await getUser({ username: 'fakeUser' });
    const post = await getPost();

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

  it('deletes a comment', async() => {
    const user = await getUser({ username: 'fakeUser' });
    const comment = await getComment({ commentBy: user._id });

    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });

});






// DELETE /comments/:id
// requires authentication
// delete a comment by id
// respond with the deleted comment
// NOTE: make sure the user attempting to delete the comment owns it

