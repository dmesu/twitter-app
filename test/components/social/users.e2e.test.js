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


test('Fetch All Users', async (t) => {
  const { server, apiUrl } = t.context;

  await server
    .post('/api/social/users')
    .send({"username":"bob"})
    .set('Accept', 'application/json')
    .expect(200);

  const res = await server
    .get('/api/social/users')
    .expect(200);

  t.true(res.body.data.some((user) => user.username === "bob"));
});

test('Follow a user', async (t) => {
  const { server, apiUrl } = t.context;

  const res = await server
    .post('/api/social/follow')
    .send({"username":"bob","followee":"mary"})
    .set('Accept', 'application/json')
    .expect(200);

  t.assert(res.body.data._id);
  t.assert(res.body.data.createdAt);
  t.like(res.body.data, {"username":"bob","followee":"mary"});
});
