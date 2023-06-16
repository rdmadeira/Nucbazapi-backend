import { AuthLogin, AuthSignIn, AuthDto } from '../dto/authUser.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export default interface AuthRepository {
  login(login: AuthLogin): Promise<ResultPromiseResponse<AuthDto>>;
  signUp(signIn: AuthSignIn): Promise<ResultPromiseResponse<AuthDto>>;
}
