import { z } from "zod";

export const CategoryRequest = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Category name cannot exceed 100 characters"),
  description: z.string().min(1, "Category description is required"),
});

export type CategoryRequest = z.infer<typeof CategoryRequest>;
