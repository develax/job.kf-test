import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../../../common/user/user.service';
import { UserCredentials } from '../../../common/user/user.credentials';

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  login(@Body() user: UserCredentials) {
    return this.userService.getUserToken(user);
  }
}
