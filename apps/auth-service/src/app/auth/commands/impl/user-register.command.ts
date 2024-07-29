interface IData {
  name: string;
  username: string;
  password: string;
}

export class UserRegisterCommand {
  constructor(public readonly data: IData) {}
}
