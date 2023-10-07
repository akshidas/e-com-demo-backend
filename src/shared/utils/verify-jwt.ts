import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PRIVATE_KEY } from 'config';
import { JsonWebTokenError, JwtPayload, verify } from 'jsonwebtoken';

const verifyJwt = async (token: string) => {
  try {
    const decoded = (await verify(token, PRIVATE_KEY)) as JwtPayload;
    if (decoded) return decoded;
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw new UnauthorizedException('unauthorized user');
    }

    throw new InternalServerErrorException('something went wrong');
  }
};

export default verifyJwt;
