import { AuthLogin, AuthResponseDto, AuthSignIn } from '../dto/Auth.js';
import AuthRepository from '../repositories/auth.repository.js';

export const authLoginInteractor =
  (authRepository: AuthRepository) =>
  async (dataLogin: AuthLogin): Promise<AuthResponseDto | null> => {
    const authResponse = await authRepository.login(dataLogin);

    return authResponse;
  };

export const authSigninInteractor =
  (authRepository: AuthRepository) =>
  async (dataSignIn: AuthSignIn): Promise<AuthResponseDto | null> => {
    const authResponse = await authRepository.signIn(dataSignIn);

    return authResponse;
  };
