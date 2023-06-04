import { AuthLogin, AuthSignIn, AuthResponse } from '../core/entities/auth.js';
import AuthRepository from '../core/repositories/Auth.repository.js';

export default class AuthDataSource implements AuthRepository {
  public async login(data: AuthLogin): Promise<AuthResponse | null> {
    return null;
  }
  public async signIn(signIn: AuthSignIn): Promise<AuthResponse | null> {
    return null;
  }
}
