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
  
  it('creates a jwt', () => {
    const user = new User({
      username: 'fox',
      password: 'hoorayitsmyadoptionday',
      profilePhotoUrl: 'https://placedog.net/500' 
    });
    const token = user.authToken();
    expect(token).toBeTruthy();
  });

  it('finds a user by token', () => {
    const user = new User({
      username: 'fox',
      password: 'hoorayitsmyadoptionday',
      profilePhotoUrl: 'https://placedog.net/500' 
    });
    const token = user.authToken();

    return User
      .findByToken(token)
      .then(foundUser => {
        expect(foundUser.toJSON()).toEqual(user.toJSON());
      });
  });

});

