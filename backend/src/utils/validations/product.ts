import z from "zod";

export const createProductSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long"),
    description: z.string().trim().min(1, "Description must be at least 10 characters long"),
    category: z.string().trim().min(1, "Category is required"),
    productImage: z.string().trim().min(1, "Product image is required")
})