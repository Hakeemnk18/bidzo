import { z } from 'zod';

export const updateUserSchema = z.object({
  id: z.string(),
  name: z
  .string()
  .min(1, { message: "Name is required and cannot be empty" }),
  phone: z
  .string()
  .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" })
  .optional(),
});

export function validateUserUpdate(userData: any) {
  return updateUserSchema.parse(userData); 
}