import { Request, Response, NextFunction } from 'express';
import { NotAuthorized } from 'src/errors/not-authorized.js';
import jwt from 'jsonwebtoken';
import { authLoginInteractor } from '../core/interactors/auth.interactor.js';
