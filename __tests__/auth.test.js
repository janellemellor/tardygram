const request = require('supertest');
const app = require('../lib/app');
require('../db/data-helpers');

describe('auth routes', () => {
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fox',
        password: 'hoorayitsmyadoptionday',
        profilePhotoUrl: 'https://placedog.net/500'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'fox',
          profilePhotoUrl: 'https://placedog.net/500',
          __v: 0
        });
      });
  });    
});



