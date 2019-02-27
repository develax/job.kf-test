import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user';
import { UserTokenService } from './token/user-token.service';
import { UserToken } from './token/user-token';
import { UserCredentials } from './user.credentials';

@Injectable()
export class UserService {
  private users = [
    new User('admin@admin.ru', '123'),
    new User('user@user.ru', '321'),
  ];

  constructor(
    private readonly userTokenService: UserTokenService,
  ) { }

  /**
   * @returns a new or previously generated user's token.
   * @throws `UnauthorizedException` if user is not found.
   */
  async getUserToken(cred: UserCredentials): Promise<UserToken> {
    const user = await this.findUser(cred);

    if (!user)
      throw new UnauthorizedException();

    if (!user.token)
      user.token = this.userTokenService.newToken();

    return user.token;
  }

  private async findUser(cred: UserCredentials): Promise<User> {
    return new Promise((resolve) => {
      // Simulate async request to DB.
      setTimeout(() => {
        const user = this.users.find(u => u.email === cred.email && u.password === cred.password);
        resolve(user);
      }, 0);
    });
  }
}
