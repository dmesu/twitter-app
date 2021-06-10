/* eslint-disable no-param-reassign */

const test = require('ava');
const request = require('supertest');
const mongoose = require('mongoose');

require('dotenv').config();

const app = require('../../../src/app');

test.before(async (t) => {
  t.context.server = request(app);
  mongoose.connect('mongodb://localhost:27017/twitter-test',function(){
    mongoose.connection.db.dropDatabase();
  });
  
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
});


test('Gets a timeline', async (t) => {
  const { server } = t.context;

  for (const i of Array(5).keys()) {
    await t.context.server
      .post('/api/tweet')
      .send({"username":"peter","message":`Hi ${i}`})
      .set('Accept', 'application/json')
      .expect(200);
  }  

  const res = await server
    .get('/api/tweet/timeline/peter')
    .expect(200);
  t.true(res.body.data.length === 5);
});

