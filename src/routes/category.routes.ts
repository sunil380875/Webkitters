import { Router } from "express";
import { CategoriesController } from "../controllers";
import CategoryValidation from "../validation/category.validation";

export default class UserRoutes {
  private router: Router;
  private categoryController: CategoriesController;

  constructor() {
    this.router = Router();
    this.categoryController = new CategoriesController();
    this.routes();
  }
  private routes() {
    //  create category
    this.router.post(
      "/",
      CategoryValidation.create,
      this.categoryController.createCategory
    );
    //  create category
    this.router.get(
      "/",
      CategoryValidation.get,
      this.categoryController.getCategories
    );
  }
}
