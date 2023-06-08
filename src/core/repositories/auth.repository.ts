import { AuthLogin, AuthSignIn, AuthResponseDto } from '../dto/Auth.js';

export default interface AuthRepository {
  login(login: AuthLogin): Promise<AuthResponseDto | null>;
  signIn(signIn: AuthSignIn): Promise<AuthResponseDto | null>;
}
