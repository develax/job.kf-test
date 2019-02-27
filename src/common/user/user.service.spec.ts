import { TestingModule, Test } from "@nestjs/testing";
import { UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserTokenService } from "./token/user-token.service";
import { UserToken } from "./token/user-token";
import { User } from "./user";
import { UserCredentials } from "./user.credentials";

describe(UserService.name, () => {
    let module: TestingModule;
    let userToken: UserToken;
    const admin = new UserCredentials("admin@admin.ru", "123");
    const user = new UserCredentials("user@user.ru", "321");

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [UserService, UserTokenService]
        }).compile();
    })

    it(`'get' must generate a new token for a user`, async () => {
        const userSerivce = module.get(UserService);
        userToken = await userSerivce.getUserToken(admin);
        expect(userToken).toBeInstanceOf(UserToken);
        expect(userToken.token).toHaveLength(32);
    });

    it(`'get' must generate unique tokens for different users`, async () => {
        const userSerivce = module.get(UserService);
        const userToken2: UserToken = await userSerivce.getUserToken(user);
        expect(userToken2).not.toStrictEqual(userToken);
    });

    it(`'get' must generate the same token for the same user`, async () => {
        const userSerivce = module.get(UserService);
        const userToken3: UserToken = await userSerivce.getUserToken(admin);
        expect(userToken3).toStrictEqual(userToken);
    });

    it(`'get' must throw an '${UnauthorizedException.name}' exception for a non-existing user's email or password`, async () => {
        const userSerivce = module.get(UserService);

        const creds = [
            { cred: new UserCredentials("admin@admin.ru", "invalid"), desc: "with wrong passwrod" },
            { cred: new UserCredentials("invalid@user.ru", "124"), desc: "with wrong email" },
        ];

        for (const obj of creds) {
            const cred = obj.cred;
            await expect(userSerivce.getUserToken(cred)).rejects.toThrow(UnauthorizedException);
        }
    });
})