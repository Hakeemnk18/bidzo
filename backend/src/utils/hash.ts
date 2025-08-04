import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(plainPassword, saltRounds);
  return hashed;
}

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export const hashResetToken = (): string => {
  const token = crypto.randomBytes(32).toString('hex');
  return token
}