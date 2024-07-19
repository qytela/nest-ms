export interface IAuthLogin {
  userId: number;
  token: string;
  roles: string[];
}

export interface IAuthMe {
  userId: number;
  name: string;
  roles: string[];
}
