import type { IAuthMe } from './Auth';

export interface IMovie {
  id: number;
  title: string;
  author: string;
  duration: number;
}

export interface IMovieCategory {
  user: IAuthMe;
  categories: ICategory[];
}

export interface ICategory {
  id: number;
  category: string;
  slug: string;
}
