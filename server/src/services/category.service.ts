import type { Category } from "../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";

export const CategoryService = {
  findAllCategories: async () => {
    return prisma.category.findMany();
  },

  findCategoryById: async (id: number) => {
    return prisma.category.findUnique({
      where: { id },
    });
  },

  createCategory: async (payload: Category) => {
    return prisma.category.create({
      data: payload,
    });
  },

  updateCategory: async (id: number, payload: { name?: string }) => {
    return prisma.category.update({
      where: { id },
      data: payload,
    });
  },

  deleteCategory: async (id: number) => {
    return prisma.category.delete({
      where: { id },
    });
  },
};
