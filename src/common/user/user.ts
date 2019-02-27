import { UserToken } from "./token/user-token"

export class User {
  constructor(
    public email: string,
    public password: string,
    public token?: UserToken
  ) {}
}
