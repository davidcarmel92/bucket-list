const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const Profile = require('./../models/Profile');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'example@gmail.com',
  password: 'abc123',
  password2: 'abc123',
  name: 'name1'
}, {
  _id: userTwoId,
  email: 'example2@gmail.com',
  password: 'abc123',
  password2: 'abc123',
  name: 'name2'
}];

const profiles = [{
    user: userOneId,
    name: users[0].name
  },
  {
    user: userTwoId,
    name: users[1].name
  }
];


const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save()
    const userTwo = new User(users[1]).save()

    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

const populateProfiles = (done) => {
  Profile.remove({}).then(() => {

    return Profile.insertMany(profiles)
  }).then(() => done());
}

module.exports = {
  users,
  profiles,
  populateUsers,
  populateProfiles
}
