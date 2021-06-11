/* eslint-disable no-param-reassign */

const test = require('ava');
const request = require('supertest');
const execSync = require('child_process').execSync;

require('dotenv').config();

const app = require('../../../src/app');
var mongoContainerId;

test.before(async (t) => {
  t.context.apiUrl = '/api/social';
  t.context.server = request(app);
  mongoContainerId = execSync('docker rm -f mongo-test 2>/dev/null && docker run -d -p 27017:27017 mongo', { encoding: 'utf-8' })
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
  execSync(`docker rm -f ${mongoContainerId}`)
});


test('Fetch All Users', async (t) => {
  const { server, apiUrl } = t.context;

  await server
    .post(apiUrl + '/users')
    .send({"username":"bob"})
    .set('Accept', 'application/json')
    .expect(200);

  const res = await server
    .get(apiUrl + '/users')
    .expect(200);

  t.true(res.body.data.some((user) => user.username === "bob"));
});

test('Follow a user', async (t) => {
  const { server, apiUrl } = t.context;

  const res = await server
    .post(apiUrl + '/follow')
    .send({"username":"bob","followee":"mary"})
    .set('Accept', 'application/json')
    .expect(200);

  t.assert(res.body.data._id);
  t.assert(res.body.data.createdAt);
  t.like(res.body.data, {"username":"bob","followee":"mary"});
});
