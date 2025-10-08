import z from "zod";

export const createCategorySchema = z.object({
    categoryName: z.string().min(1, "Category name is required"),
    description: z.string().min(1, "Description is required"),
});