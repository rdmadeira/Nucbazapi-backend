import { AuthLogin, AuthSignIn, AuthDto } from '../core/dto/authUser.js';
import AuthRepository from '../core/repositories/auth.repository.js';
import { User } from '@prisma/client'; // es nuestro type de user definido en prisma

import jwt from 'jsonwebtoken'; // crea tokens momentaneos
import bcrypt from 'bcryptjs'; // hace el hash (encrypta) de un password

import prisma from '../config/db.js';
import crypto from 'crypto'; // modulo interno de node
import { resolve } from 'path';

export default class AuthDataSource implements AuthRepository {
  public async login(loginData: AuthLogin): Promise<AuthDto | null> {
    const user = await prisma.user.findUnique({
      where: { email: loginData.email },
      include: {
        role: true,
      },
    });

    if (!user) return null;

    const isMatch = await this.matchPw(user, loginData.password);

    if (!isMatch) {
      return null;
    }

    const token = this.getSignedToken(user);

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      token,
      expiresIn: 60 * 60 * 1000,
      role: {
        roleId: user.role.id,
        roleName: user.role.role,
      },
    };
  }

  public async signUp(signInData: AuthSignIn): Promise<AuthDto | null> {
    const existsUser = await prisma.user.findUnique({
      where: { email: signInData.email },
    });
    // Check user no exist en la base de datos:
    if (existsUser) {
      return null; // Podes generar un error acá o en el controller
    }

    // Generar un hash del password:
    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(signInData.password, salt);

    // Crear user:
    const user = await prisma.user.create({
      data: {
        name: signInData.name,
        email: signInData.email,
        password: hashpassword,
        roleId: signInData.roleId,
      },
      include: {
        role: true,
      },
      // Hay que crear (popular) primero la tabla Role de la base de datos, si no, va a saltar error del tipo: /* Foreign key constraint failed on the field: `(not available)` - error de prisma. Eso se debe a que no existe todavía rows en la tabla Role, y user depende de roleId. Hay que crear un seed de prisma para grabar en la db, tabla Role */
    });

    // Crear token:
    const token = this.getSignedToken(user);

    return {
      name: user.name,
      email: user.email,
      userId: user.id,
      token,
      expiresIn: 60 * 60 * 1000, // 1 hora se definió en process.env.jwt_expire
      role: {
        roleId: user.roleId,
        roleName: user.role.role,
      },
    };
  }

  private getSignedToken(user: User) {
    return jwt.sign({ id: user.id }, process.env.JWT_KEY!, {
      expiresIn: process.env.JWT_EXPIRE!, // Los simbolos de ! dice a typescript que está todo bien usar estas keys de .env
    });
  }
  private async matchPw(user: User, pw: string): Promise<boolean> {
    return await bcrypt.compare(pw, user.password);
  }
}
