import { UserDto } from '../core/dto/authUser.js';
import UserRepository from '../core/repositories/user.repository.js';
import prisma from '../config/db.js';

export default class UserDatasource implements UserRepository {
  public async getUserById(userId: number): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: { roleName: user.role.role, roleId: user.roleId },
    };
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
