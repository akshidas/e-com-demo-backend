import { InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

type JWTPayload = { email: string };

const genJwt = async (payload: JWTPayload) => {
  try {
    return sign(payload, 'privateKey', { algorithm: 'none' });
  } catch (err) {
    throw new InternalServerErrorException('Failed to generate jwt');
  }
};

export default genJwt;
