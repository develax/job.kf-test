import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserModule } from '../../common/user/user.module';

@Module({
  controllers: [
    UserController,
  ],
  imports: [
    UserModule,
  ],
})
export class V1Module {}
