import axios from 'axios';

import type { IAuthMe } from 'shared/interfaces/Auth';
import type { IMovie, IMovieCategory, ICategory } from 'shared/interfaces/Movie';

describe('/api/movie', () => {
  it('should return a movies', async () => {
    const res = await axios.get('/api/movie');

    expect(res.status).toBe(200);
    expect(res.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining<IMovie>({
          id: expect.any(Number),
          title: expect.any(String),
          author: expect.any(String),
          duration: expect.any(Number),
        }),
      ])
    );
  });

  it('should return a categories', async () => {
    const res = await axios.get('/api/movie/category');

    expect(res.status).toBe(200);
    expect(res.data).toEqual(
      expect.objectContaining<IMovieCategory>({
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
