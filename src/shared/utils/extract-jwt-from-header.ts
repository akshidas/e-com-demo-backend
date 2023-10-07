import { UnauthorizedException } from '@nestjs/common';

const extractJwtFromHeaders = (headers) => {
  const { authorization } = headers;
  if (authorization) return authorization.split(' ')[1];

  throw new UnauthorizedException('unauthorized user');
};

export default extractJwtFromHeaders;
