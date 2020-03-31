require('dotenv').config();

const User = require('./User');

describe('User model', () => {
  it('hashes a password', () => {
    const user = new User({
      username: 'fox',
      password: 'hoorayitsmyadoptionday',
      profilePhotoUrl: 'https://placedog.net/500'
    });
    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });   

});

