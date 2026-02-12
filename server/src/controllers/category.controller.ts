import type { Request, Response } from "express";
import { CategoryService } from "../services/category.service.ts";

export const CategoryController = {
  findAllCategories: async (req: Request, res: Response) => {
    res.json(await CategoryService.findAllCategories());
  },

  findCategoryById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await CategoryService.findCategoryById(id);
    res.json(category);
  },

  createCategory: async (req: Request, res: Response) => {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json(category);
  },

  updateCategory: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await CategoryService.updateCategory(id, req.body);
    res.json(category);
  },

  deleteCategory: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await CategoryService.deleteCategory(id);
    res.status(204).send();
  },
};
