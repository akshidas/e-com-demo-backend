import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import extractJwtFromHeaders from '../utils/extract-jwt-from-header';
import verifyJwt from '../utils/verify-jwt';

@Injectable()
class AuthMiddleWare implements NestMiddleware {
  async use(req, res: Response, next: NextFunction) {
    const { id, isAdmin } = await verifyJwt(extractJwtFromHeaders(req.headers));
    req.id = id;
    req.isAdmin = isAdmin;
    next();
  }
}

export default AuthMiddleWare;
