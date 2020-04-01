const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

module.exports = async({ usersToCreate = 5, postsToCreate = 10 } = {}) => {
  const loggedInUser = await User.create({
    username: 'fakeUser',
    password: 'iliketoeatapplesandbananas',
    profilePhotoUrl: 'https://placedog.net/500' 
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.string(10),
    profilePhotoUrl: chance.url({ path: 'images' }) 
  })));

  const posts = await Post.create([...Array(postsToCreate)].map(() => ({
    user: chance.pickone(users)._id,
    photoUrl: chance.url({ path: 'images' }),
    caption: chance.sentence(),
    tags:[chance.hashtag()]
  })));
};
