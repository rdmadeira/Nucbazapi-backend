import { AuthLogin, AuthSignIn, AuthResponse } from '../core/entities/Auth.js';
import AuthRepository from '../core/repositories/auth.repository.js';
import { User } from '@prisma/client'; // es nuestro type de user definido en prisma

import jwt from 'jsonwebtoken'; // crea tokens momentaneos
import bcrypt from 'bcryptjs'; // hace el hash (encrypta) de un password

import prisma from '../config/db.js';
import crypto from 'crypto'; // modulo interno de node

export default class AuthDataSource implements AuthRepository {
  public async login(loginData: AuthLogin): Promise<AuthResponse | null> {
    const user = await prisma.user.findUnique({
      where: { email: loginData.email },
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
    };
  }

  public async signIn(signInData: AuthSignIn): Promise<AuthResponse | null> {
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
      },
    });

    // Crear token:
    const token = this.getSignedToken(user);

    return {
      name: user.name,
      email: user.email,
      userId: user.id,
      token,
      expiresIn: 60 * 60 * 1000, // 1 hora se definió en process.env.jwt_expire
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
