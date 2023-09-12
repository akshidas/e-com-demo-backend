import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const verifyPassword = async (plainText: string = '', hash: string = '') => {
  try {
    return await bcrypt.compare(plainText, hash);
  } catch (err) {
    throw new InternalServerErrorException('Failed to verify password');
  }
};
export default verifyPassword;
