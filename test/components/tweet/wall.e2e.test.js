/* eslint-disable no-param-reassign */

const test = require('ava');
const request = require('supertest');
const execSync = require('child_process').execSync;


require('dotenv').config();

const app = require('../../../src/app');
var mongoContainerId;


test.before(async (t) => {
  t.context.server = request(app);
  mongoContainerId = execSync('docker rm -f mongo-test 2>/dev/null && docker run -d -p 27017:27017 mongo', { encoding: 'utf-8' })
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
  execSync(`docker rm -f ${mongoContainerId}`)
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

