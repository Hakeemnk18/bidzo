import z from "zod";

export const createCategorySchema = z.object({
  categoryName: z.string().trim().min(1, "Category name is required"),
  description: z.string().trim().min(1, "Description is required"),
});
