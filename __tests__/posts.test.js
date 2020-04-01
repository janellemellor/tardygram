const { getAgent, getUser, getPost, getPosts } = require('../db/data-helpers');

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

  it('finds a post by id', async() => {
    const post = await getPost();
    const user = await getUser({ _id: post.user });
    
    return request(app)
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...post,
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


});


// * `PATCH /posts/:id`
//   * requires authentication
//   * only can update the post caption
//   * respond with the updated post
//   * NOTE: make sure the user attempting to update the post owns it




// UPDATE `GET /posts/:id`
//  include all comments associated with the post (populated with commenter)
//     * HINT: You'll need to make two separate queries and a `Promise.all`



// * `DELETE /posts/:id`
//   * requires authentication
//   * deletes a post
//   * responds with the deleted post
//   * NOTE: make sure the user attempting to delete the post owns it
// * `GET /posts/popular`
//   * respond with a list of the 10 posts with the most comments