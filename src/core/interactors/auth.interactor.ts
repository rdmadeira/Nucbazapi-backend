import { AuthLogin, AuthDto, AuthSignIn } from '../dto/authUser.js';
import AuthRepository from '../repositories/auth.repository.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export const authLoginInteractor =
  (authRepository: AuthRepository) =>
  async (dataLogin: AuthLogin): Promise<ResultPromiseResponse<AuthDto>> => {
    const authResponse = await authRepository.login(dataLogin);

    return authResponse;
  };

export const authSigninInteractor =
  (authRepository: AuthRepository) =>
  async (dataSignIn: AuthSignIn): Promise<ResultPromiseResponse<AuthDto>> => {
    const authResponse = await authRepository.signUp(dataSignIn);

    return authResponse;
  };
