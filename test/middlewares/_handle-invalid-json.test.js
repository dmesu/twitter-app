/* eslint-disable no-param-reassign */

const test = require('ava');
const faker = require('faker');
const request = require('supertest');

require('dotenv').config();

const app = require('../../src/app');

test.before(async (t) => {
  t.context.apiUrl = `/api/v1/social/users`;
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../src/app')]; // kills server
});

test('Handle invalid json', async (t) => {
  const { server, apiUrl } = t.context;
  const res = await server
    .post(apiUrl)
    .send(bullshit)
    .expect(400);
  t.true(res.status === 400);
});
