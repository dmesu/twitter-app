/* eslint-disable no-param-reassign */

const test = require('ava');
const request = require('supertest');
const mongoose = require('mongoose');

require('dotenv').config();

const app = require('../../../src/app');

test.before(async (t) => {
  t.context.apiUrl = '/api/social/users';
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
});

test('Fetch All Users', async (t) => {

  const { server, apiUrl } = t.context;

  await server
    .post(apiUrl)
    .send({"username":"daida"})
    .set('Accept', 'application/json')
    .expect(200);

  const res = await server
    .get(apiUrl)
    .expect(200);
  t.true(res.body.data.length === 1);
});
