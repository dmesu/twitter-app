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
    .send({"tweed_id": tweetRes.body.data._id, "username_id": userRes.body.data._id })
    .set('Accept', 'application/json')
    .expect(200);

    // console.log("tweet id", tweetRes.body.data._id);
    // console.log("user id", userRes.body.data._id);
    // console.log("LIKE", like.body.data);


  const like2 = await server
    .post('/api/social/like')
    .send({"tweed_id": tweet2Res.body.data._id, "username_id": user2Res.body.data._id })
    .set('Accept', 'application/json')
    .expect(200);  

   const likesFromAnna = await server
    .get(`/api/social/likes/${userRes.body.data._id}`)
    .expect(200);  
    
  t.true(likesFromAnna.body.data.lenght === 1)
});