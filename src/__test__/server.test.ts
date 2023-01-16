// import server from "../server"
import request from 'supertest';
import server from '../server';

let app = server;

describe('Test Server', () => {
  it('get users', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('create users', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'John', age: 23, hobbies: ['football'] });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({
      username: 'John',
      age: 23,
      hobbies: ['football'],
    });
  });

  it('get user by id', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'Mika', age: 6, hobbies: ['sleep'] });

    const id = res.body.id;

    const getById = await request(app).get(`/api/users/${id}`);

    expect(getById.statusCode).toEqual(200);
    expect(getById.body.id).toEqual(id);
  });
});
