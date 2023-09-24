import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import verifyJwt from '../utils/verify-jwt';

@Injectable()
class AuthMiddleWare implements NestMiddleware {
  async use(req, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (authorization) {
      const id = await verifyJwt(authorization.split(' ')[1]);
      req.id = id;
      next();
      return;
    }

    throw new UnauthorizedException('unauthorized user');
  }
}

export default AuthMiddleWare;
