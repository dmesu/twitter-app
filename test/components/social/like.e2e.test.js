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


test('Gets a list of likes from a user', async (t) => {
  const { server, apiUrl } = t.context;

  const userRes = await server
    .post('/api/social/users')
    .send({"username":"anna"})
    .set('Accept', 'application/json')
    .expect(200);

   const user2Res = await server
    .post('/api/social/users')
    .send({"username":"tom"})
    .set('Accept', 'application/json')
    .expect(200);  

  const tweetRes = await server
    .post('/api/tweet')
    .send({"username":"tom","message":"What a likable tweet!"})
    .set('Accept', 'application/json')
    .expect(200);

  const tweet2Res = await server
    .post('/api/tweet')
    .send({"username":"charles","message":"What a likable tweet!"})
    .set('Accept', 'application/json')
    .expect(200);  

  const like = await server
    .post('/api/social/like')
    .send({"tweetId": tweetRes.body.data._id, "usernameId": userRes.body.data._id })
    .set('Accept', 'application/json')
    .expect(200);

  const like2 = await server
    .post('/api/social/like')
    .send({"tweetId": tweet2Res.body.data._id, "usernameId": user2Res.body.data._id })
    .set('Accept', 'application/json')
    .expect(200);  


   const likesFromAnna = await server
    .get(`/api/social/likes/${userRes.body.data._id}`)
    .expect(200);  

  t.true(likesFromAnna.body.data.length === 1)
  t.like(likesFromAnna.body.data[0], {"usernameId": userRes.body.data._id, "tweetId": tweetRes.body.data._id})
});