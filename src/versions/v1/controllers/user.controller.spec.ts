import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../../common/user/user.service';
import { UserTokenService } from '../../../common/user/token/user-token.service';
import { UserToken } from '../../../common/user/token/user-token';
import { UserCredentials } from '../../../common/user/user.credentials';

describe(UserController.name, () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, UserTokenService]
        }).compile();
    });

    describe("/POST login", async () => {
        it("[valid users]", async () => {
            const controller = module.get<UserController>(UserController);
            
            const creds = [
                new UserCredentials("admin@admin.ru", "123"),
                new UserCredentials("user@user.ru", "321")
            ];

            for (const cred of creds) {
                const userToken = await controller.login(cred);
                expect(userToken).toBeInstanceOf(UserToken);
                expect(userToken.token).toHaveLength(32);
            }
        });

        it("[invalid users]", async () => {
            const controller = module.get<UserController>(UserController);
            
            const creds = [
                { cred: new UserCredentials("admin@admin.ru", "invalid"), desc: "with wrong passwrod" },
                { cred: new UserCredentials("invalid@user.ru", "124"), desc: "with wrong email" },
            ];

            for (const obj of creds) {
                const cred = obj.cred;
                await expect(controller.login(cred)).rejects.toThrow(UnauthorizedException);
            }
        });

    });
})