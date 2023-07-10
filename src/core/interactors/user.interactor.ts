import { UserDto } from '../dto/authUser.js';
import UserRepository from '../repositories/user.repository.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export const getUserByIdInteractor =
  (userRepository: UserRepository) =>
  async (userId: number): Promise<ResultPromiseResponse<UserDto | null>> => {
    const user = await userRepository.getUserById(userId);

    if (!user.success) return user;

    return user;
  };
