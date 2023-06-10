import { UserDto } from '../dto/authUser.js';
import UserRepository from '../repositories/user.repository.js';

export const getUserByIdInteractor =
  (userRepository: UserRepository) =>
  async (userId: number): Promise<UserDto | null> => {
    const user = await userRepository.getUserById(userId);

    return user;
  };
