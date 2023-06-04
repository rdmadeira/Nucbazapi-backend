import { AuthLogin, AuthResponse, AuthSignIn } from '../entities/auth.js';
import AuthRepository from '../repositories/Auth.repository.js';

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
