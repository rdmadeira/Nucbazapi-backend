import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDto } from '../core/dto/authUser.js';

import { NotAuthorizedError } from '../errors/not-authorized.js';
import interactors from '../core/interactors/index.js';

/* interface RequestUser extends Request {
  user?: UserDto;
} */

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1- Verificar que en request exista en el header la authorization y que tenga el token:
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') // metodo de string
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new NotAuthorizedError());
  }

  // 2- Validar que el token sea un token valido:
  /// Usamos el try-catch para capturar el error en caso de el token no es mas valido!!! Si no salta el error de jsonwebtoken, sin capturarlo y nunca enviariamos la respuesta
  try {
    const decode: any = jwt.verify(
      // el type de decode es el dato del id (que definimos al generar el token en datasource), o un error
      token,
      process.env.JWT_KEY!
    );
    const user = await interactors.GetUserByIdInteractor(decode.id);

    // Si el user es null, tiramos el error de NotAuthorizedError.
    if (!user) {
      return next(new NotAuthorizedError());
    }

    // 3- Si token es valido, inyectamos user al objeto request y continuamos la cadena de middlewares:
    req.user = user; // Se inserta user en el req. Se declaró un Request agregando el user en index.d.ts en la carpeta types.
    return next();
  } catch (error) {
    return next(new NotAuthorizedError());
  }
};

export const authorizedAdmin =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role ? req.user.role.roleName : ''; // Request ahora contiene user por el custom type en index.d.ts

    if (!roles.includes(userRole)) {
      return next(new NotAuthorizedError());
    }

    return next();
  };
