import axios from 'axios';

import type { IAuthLogin } from 'shared/interfaces/Auth';

describe('/api/auth', () => {
  it('should return a user success login', async () => {
    const res = await axios.post('/api/auth/login', {
      username: 'qytela',
      password: '123123',
    });

    expect(res.status).toBe(201);
    expect(res.data).toEqual(
      expect.objectContaining<IAuthLogin>({
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
