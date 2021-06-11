/* eslint-disable no-param-reassign */

const test = require('ava');
const request = require('supertest');
const { GenericContainer } = require("testcontainers");

require('dotenv').config();

let mongo;

test.before(async (t) => {
  mongo = await new GenericContainer("mongo")
    .withExposedPorts(27017)
    .start();
  const mappedPort = mongo.getMappedPort(27017)
  const app = require('../../../src/app')(`mongodb://localhost:${mappedPort}/twitter-test`);
  t.context.server = request(app);
});

test.after.always(async (t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
  await mongo.stop();
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

