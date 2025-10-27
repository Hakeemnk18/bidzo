import z from "zod";

export const updateUserSchema = z.object({
  name: z
  .string()
  .min(1, { message: "Name is required and cannot be empty" }),
  phone: z
  .string()
  .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" })
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema> & { id: string};


