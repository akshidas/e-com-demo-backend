import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const genHash = async (plainText: string = '') => {
  try {
    return await bcrypt.hash(plainText, 10);
  } catch (err) {
    throw new InternalServerErrorException('Failed to hash password');
  }
};
export default genHash;
