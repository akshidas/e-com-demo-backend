import { InternalServerErrorException } from '@nestjs/common';
import { PRIVATE_KEY } from 'config';
import { JwtPayload, sign } from 'jsonwebtoken';

const genJwt = async (payload: JwtPayload) => {
  const token = await sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
  if (token) return token;
  throw new InternalServerErrorException('Failed to generate jwt');
};

export default genJwt;
