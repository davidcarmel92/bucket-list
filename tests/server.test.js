const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const keys = require('./../config/keys');
const axios = require('axios');

const {app} = require('./../server');
const User = require('./../models/User');
const Profile = require('./../models/Profile');
const Pin = require('./../models/Pin');
// const {users, populateUsers, populateProfiles, profiles} = require('./seed')


const userOneId = new ObjectID();
const users = [{
  email: 'example@gmail.com',
  password: 'abc123',
  password2: 'abc123',
  name: 'name1'
}];

let userToken = '';

const profiles = [{
    user: userOneId,
    name: users[0].name
  }
];

before((done) => {
  Pin.remove({}).then(() => {
    User.remove({})
    .then(() => done());
  })
});




describe('POST /api/users/register', () => {

  it('should register user', () => {
    request(app)
     .post('/api/users/register')
     .send(users[0])
     .expect(200)
     .then(res => {
       users[0].id = res.body._id
       console.log(res.body)
     })
  });
});

var agent = request.agent(app);

const newPin = {
  title: 'test pin 1',
  description: 'test description',
  status: 'todo',
  img: {data: null, contentType: 'image/png'},
  rating: 5
}

function logInUser() {
  agent
   .post('/api/users/login')
   .send({"email": users[0].email, "password": users[0].password})
   .expect(200)
   .then(user => {
     userToken = user.body.token
   });
}

describe('POST /api/users/login', () => {

  beforeEach(logInUser)

  it('should login user', (done) => {

    agent
      .post('/api/pins/')
      .send(newPin)
      .expect(200)
      .expect((pin) => {
        expect(pin.body.title).toBe(newPin.title);
        expect(pin.body.user).toBe(users[0].id)
      })
      .then(() => done())
  });

  // it('should login user', (done) => {
  //   request(app)
  //    .post('/api/users/login')
  //    .send({"email": users[0].email, "password": users[0].password})
  //    .expect(200)
  //    .then(user => {
  //      userToken = user.body.token
  //      request(app)
  //       .post('/api/pins/').set('Authorization', userToken)
  //       .send(newPin)
  //       .expect(200)
  //       .expect((pin) => {
  //         expect(pin.body.title).toBe(newPin.title);
  //         expect(pin.body.user).toBe(users[0].id)
  //       })
  //       .then(() => done())
  //    });
  // });

  // it('should create a new pin', () => {
  //   console.log(userToken)
  //   request(app)
  //    .post('/api/pins/').set('Authorization', userToken)
  //    .send(newPin)
  //    .expect(200)
  //    .then(res => {
  //       console.log(res)
  //    })
  // });
});
