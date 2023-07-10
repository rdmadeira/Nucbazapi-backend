import { UserDto } from '../core/dto/authUser.js';
import UserRepository from '../core/repositories/user.repository.js';
import prisma from '../config/db.js';
import { ResultPromiseResponse } from '../core/responseTypes/response.js';
import { BadRequestError } from '../errors/bad_request_error.js';
import { ServerError } from '../errors/server_error.js';

export default class UserDatasource implements UserRepository {
  public async getUserById(
    userId: number
  ): Promise<ResultPromiseResponse<UserDto | null>> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          role: true,
        },
      });
      if (!user) return { result: null, success: true };
      return {
        result: {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: { roleName: user.role.role, roleId: user.roleId },
        },
        success: true,
      };
    } catch (error) {
      const err = new ServerError('Internal Server Error');

      return { err, success: false };
    }
  }

  public async findUser(valor: any): Promise<UserDto[] | null> {
    const users = await prisma.user.findMany({
      where: valor,
      include: {
        role: true,
      },
    });

    if (users.length === 0) return null;

    const usersDto = users.map((user) => ({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: {
        roleName: user.role.role,
        roleId: user.roleId,
      },
    }));

    return usersDto;
  }
}
