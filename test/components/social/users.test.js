/* eslint-disable no-param-reassign */

const test = require('ava');
const sinon = require('sinon');
const faker = require('faker');
const request = require('supertest');

require('dotenv').config();

// dependency to be stubbed
const { SocialService } = require('../../../src/components/social/social.component');

// stubs
const getUsers = sinon.stub(SocialService, 'getUsers').resolves([{
  _id: "60afb662ad6cbe1d1ae85850",
  username: "peter"
}]);

const app = require('../../../src/app');

test.before(async (t) => {
  t.context.stubs = {
    getUsers,
  };
  t.context.apiUrl = '/api/v1/social/users';
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
});

test('(Unit Test) Fetch All Users', async (t) => {
  const { server, apiUrl, stubs } = t.context;
  const res = await server
    .get(apiUrl)
    .expect(200);
  t.true(stubs.getUsers.calledOnce);
  t.true(res.body.data.length > 0);
});