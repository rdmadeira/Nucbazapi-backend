import { AuthLogin, AuthSignIn, AuthResponse } from '../entities/Auth.js';

export default interface AuthRepository {
  login(login: AuthLogin): Promise<AuthResponse | null>;
  signIn(signIn: AuthSignIn): Promise<AuthResponse | null>;
}
