const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ usersToCreate = 5 } = {}) => {
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
};
