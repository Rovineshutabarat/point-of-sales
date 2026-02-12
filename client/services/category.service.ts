import { Category } from "@/types/entity/category";
import { CategoryRequest } from "@/types/entity/payload/request/category.request";
import { ApiClient } from "./config/api.client";

export class CategoryService {
  static async findAllCategories() {
    return ApiClient.get("category").json<Category[]>();
  }

  static async findCategoryById(id: number) {
    return ApiClient.get(`category/${id}`).json<Category>();
  }

  static async createCategory(data: CategoryRequest) {
    return ApiClient.post("category", {
      json: data,
    }).json<Category>();
  }

  static async updateCategory(id: number, data: CategoryRequest) {
    return ApiClient.put(`category/${id}`, {
      json: data,
    }).json<Category>();
  }

  static async deleteCategory(id: number) {
    return ApiClient.delete(`category/${id}`).json<Category>();
  }
}
