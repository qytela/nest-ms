import type { IAuthMe } from './Auth';

export interface IMovieCategory {
  user: IAuthMe;
  categories: ICategory[];
}

export interface ICategory {
  id: number;
  category: string;
  slug: string;
}
