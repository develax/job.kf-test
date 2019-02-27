import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserTokenService } from './token/user-token.service';

@Module({
  providers: [
    UserService,
    UserTokenService,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {}
