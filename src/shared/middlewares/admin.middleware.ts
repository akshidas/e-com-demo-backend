import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
class AdminMiddleWare implements NestMiddleware {
  async use(req, res: Response, next: NextFunction) {
    if (req.isAdmin) {
      next();
      return;
    }

    throw new UnauthorizedException('this is a protected routed');
  }
}

export default AdminMiddleWare;
