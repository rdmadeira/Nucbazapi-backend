import { UserDto } from '../dto/authUser.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export default interface UserRepository {
  getUserById(userId: number): Promise<ResultPromiseResponse<UserDto | null>>;
  findUser(valor: any): Promise<UserDto[] | null>;
}
