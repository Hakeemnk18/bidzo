import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { boolean } from 'zod';

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


export const generatedSignature = (
  razorpay_order_id: string,
  razorpay_payment_id: string
): string => {

  const signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  return signature
}

export const verifySignature = (
  generatedSignature: string,
  razorpay_signature: string
):boolean =>  {
  return generatedSignature === razorpay_signature
}
