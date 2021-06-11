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

test('Gets a wall', async (t) => {
  const { server } = t.context;

  await t.context.server
    .post('/api/tweet')
    .send({"username":"followee1","message":`I am 1`})
    .set('Accept', 'application/json')
    .expect(200);
  
  await t.context.server
    .post('/api/tweet')
    .send({"username":"followee2","message":`I am 2`})
    .set('Accept', 'application/json')
    .expect(200);

  await t.context.server
    .post('/api/tweet')
    .send({"username":"followee3","message":`I am 3`})
    .set('Accept', 'application/json')
    .expect(200);  

  await server
    .post('/api/social/follow')
    .send({"username":"myself","followee":"followee1"})
    .set('Accept', 'application/json')
    .expect(200);

  await server
    .post('/api/social/follow')
    .send({"username":"myself","followee":"followee2"})
    .set('Accept', 'application/json')
    .expect(200);
  
  const res = await server
    .get('/api/tweet/wall/myself')
    .expect(200);
  t.true(res.body.data.length === 2);
});

