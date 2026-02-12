import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.ts";

const categoryRouter: Router = Router();

categoryRouter.get("/", CategoryController.findAllCategories);
categoryRouter.get("/:id", CategoryController.findCategoryById);
categoryRouter.post("/", CategoryController.createCategory);
categoryRouter.put("/:id", CategoryController.updateCategory);
categoryRouter.delete("/:id", CategoryController.deleteCategory);

export default categoryRouter;
