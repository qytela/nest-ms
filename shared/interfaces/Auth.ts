export interface IAuthLogin {
  userId: number;
  token: string;
  roles: string[];
}

export interface IAuthRegister {
  name: string;
  username: string;
  password: string;
}

export interface IAuthMe {
  userId: number;
  name: string;
  roles: string[];
}
