import { PRIVATE_KEY } from 'config';
import { verify } from 'jsonwebtoken';

const verifyJwt = async (token: string) => {
  var decoded = (await verify(token, PRIVATE_KEY)) as {
    id: string;
  };
  return decoded.id;
};

export default verifyJwt;
