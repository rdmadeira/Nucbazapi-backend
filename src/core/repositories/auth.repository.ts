import { AuthLogin, AuthSignIn, AuthDto } from '../dto/authUser.js';

export default interface AuthRepository {
  login(login: AuthLogin): Promise<AuthDto | null>;
  signUp(signIn: AuthSignIn): Promise<AuthDto | null>;
}
