import { AuthLogin, AuthResponse, AuthSignIn } from '../entities/Auth.js';
import AuthRepository from '../repositories/auth.repository.js';

export const authLoginInteractor =
  (authRepository: AuthRepository) =>
  async (dataLogin: AuthLogin): Promise<AuthResponse | null> => {
    const authResponse = await authRepository.login(dataLogin);

    return authResponse;
  };

export const authSigninInteractor =
  (authRepository: AuthRepository) =>
  async (dataSignIn: AuthSignIn): Promise<AuthResponse | null> => {
    const authResponse = await authRepository.signIn(dataSignIn);

    return authResponse;
  };
