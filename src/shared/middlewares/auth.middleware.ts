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
      const email = await verifyJwt(authorization.split(' ')[1]);
      req.email = email;
      next();
      return;
    }

    throw new UnauthorizedException('unauthorized user');
  }
}

export default AuthMiddleWare;
