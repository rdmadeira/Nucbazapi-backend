import { UserDto } from '../dto/authUser.js';

export default interface UserRepository {
  getUserById(userId: number): Promise<UserDto | null>;
  findUser(valor: any): Promise<UserDto[] | null>;
}
