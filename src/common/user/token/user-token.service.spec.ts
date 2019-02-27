import { UserTokenService } from "./user-token.service";
import { UserToken } from "./user-token";

describe(UserTokenService.name, () => {
    let userToken: UserToken;

    it(`'newToken' must generate a new '${UserToken.name}'`, () => {
        userToken = new UserTokenService().newToken();
        expect(userToken).toBeInstanceOf(UserToken);
        expect(userToken.token).toHaveLength(32);
    });

    it(`each new '${UserToken.name}' must be unique`, () => {
        const userToken2 = new UserTokenService().newToken();
        expect(userToken2).not.toStrictEqual(userToken);
    });
});
