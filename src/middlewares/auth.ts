import { Request, Response, NextFunction } from 'express';
import { NotAuthorized } from 'src/errors/not-authorized.js';
import jwt from 'jsonwebtoken';
import { authLoginInteractor } from '../core/interactors/auth.interactor.js';

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1- Verificar que en request exista el header authorization y que tenga el token:
  // 2- Validar que el token sea un token valido:
  // 3- Si token es valido, inyectamos user al objeto request y continuamos la cadena de middlewares. Si no es valido, tiramos el error de NotAuthorizedError.
};
