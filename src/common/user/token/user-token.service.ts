import { Injectable } from '@nestjs/common';
import { UserToken } from './user-token';
import * as random from 'randomstring'

@Injectable()
export class UserTokenService {
    newToken(): UserToken {
        return new UserToken(random.generate({ length: 32 }));
    }
}
