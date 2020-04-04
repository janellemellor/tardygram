const { getAgent, getUser, getPost, getPosts, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('post routes', () => {
  it('creates a post', async() => {
    const user = await getUser({ username: 'fakeUser' });
     
    return getAgent()
      .post('/api/v1/posts')
      .send({ 
        user: user._id,
        photoUrl: 'https://placedog.net/500',
        caption: 'dogs are better than humans',
        tags:['#rufflife, #puppypuddle']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoUrl: 'https://placedog.net/500',
          caption: 'dogs are better than humans',
          tags:['#rufflife, #puppypuddle'],
          __v: 0  
        });
      });
  });

  it('gets all posts', async() => {
    const posts = await getPosts();

    return request(app)
      .get('/api/v1/posts')
      .then(res => {
        expect(res.body).toEqual(posts);
      });
  });

  it('gets the top ten posts', () => {
    return request(app)
      .get('/api/v1/posts/popular')
      .then(res => {
        expect(res.body.length).toEqual(10);
        expect(res.body).toContainEqual({
          _id: expect.any(String), 
          caption: expect.any(String), 
          totalComments: expect.any(Number)
        });
      });
  });

  it('finds a post by id', async() => {
    const post = await getPost();
    const user = await getUser({ _id: post.user });
    const comments = await getComments({ post: post._id });
    
    return request(app)
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          comments: comments.map(comment => ({
            _id: comment._id,
            post: comment.post,
            comment: comment.comment, 
            commentBy: {
              _id: comment.commentBy, 
              username: expect.any(String)
            }
          })),   
          user
        });
      });
  });

  it('updates a post', async() => {
    const user = await getUser({ username: 'fakeUser' });
    const post = await getPost({ user: user._id });
    
    
    return getAgent()
      .patch(`/api/v1/posts/${post._id}`)
      .send({ caption: 'i am serious. dogs are better than humans.' })
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          caption: 'i am serious. dogs are better than humans.' 
        });
      });
  });

  it('deletes a note', async() => {
    const user = await getUser({ username: 'fakeUser' });
    const post = await getPost({ user: user._id });

    return getAgent()
      .delete(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual(post);
      });
  });

});



