import { Controller, Post } from '@nestjs/common';
import { UserService } from '../../../common/user/user.service';

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  login() {
    return true;
  }
}
