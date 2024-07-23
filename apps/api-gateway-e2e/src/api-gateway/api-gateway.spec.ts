import axios from 'axios';

import type { IAuthLogin, IAuthMe } from 'shared/interfaces/Auth';
import type { IMovieCategory, ICategory } from 'shared/interfaces/Movie';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});

describe('/api/auth', () => {
  it('should return a user success login', async () => {
    const res = await axios.post('/api/auth/login', {
      username: 'qytela',
      password: '123123',
    });

    expect(res.status).toBe(201);
    expect(res.data).toEqual(
      expect.objectContaining(<IAuthLogin>{
        userId: expect.any(Number),
        token: expect.any(String),
        roles: expect.any(Array),
      })
    );
  });

  it('should return a user failed login', async () => {
    axios
      .post('/api/auth/login', {
        username: 'qytela',
        password: 'xxx',
      })
      .then((res) => expect(res.status).toBe(201))
      .catch((res) => expect(res.response.data.statusCode).toBe(401));
  });
});

describe('/api/movie', () => {
  it('should return a categories', async () => {
    const res = await axios.get('/api/movie/category');

    expect(res.status).toBe(200);
    expect(res.data).toEqual(
      expect.objectContaining(<IMovieCategory>{
        user: expect.objectContaining<IAuthMe>({
          userId: expect.any(Number),
          name: expect.any(String),
          roles: expect.any(Array),
        }),
        categories: expect.arrayContaining([
          expect.objectContaining<ICategory>({
            id: expect.any(Number),
            category: expect.any(String),
            slug: expect.any(String),
          }),
        ]),
      })
    );
  });
});
