/* eslint-disable no-param-reassign */
const test = require('ava');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const User = require('../../../src/components/social/model/user')

require('dotenv').config();

const mongod = new MongoMemoryServer()

test.before(async (t) => {
  const uri = await mongod.getUri();
  const app = require('../../../src/app')(uri);
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
});

test.afterEach.always(async () => await User.deleteMany());

test('(In-Memory) Fetch All Users', async (t) => {
  const { server } = t.context;
  
  const user = new User({
		username: 'peter'
	});
	await user.save();

  const res = await server
    .get('/api/social/users')
    .expect(200);
  t.true(res.body.data.length === 1);
});
