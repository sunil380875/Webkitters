import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import fieldValid from "../middleware/fieldValidation.middleware";
import { MIDDLEWARE_REQUEST_TYPE } from "../types/global.types";
import { CategoryLogic } from "../logic";
class CategoriesController {
  public async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      fieldValid(req);
      const { title } = req.body;
      const category = await new CategoryLogic().createCategory({
        title: title.trim().toUpperCase(),
      });
      res.json({
        success: true,
        message: "Successful",
        category: category,
      });
    } catch (error) {
      next(error);
    }
  }
  public async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      fieldValid(req);
      const { perPage, pageNo, question } = req.query;
      const categories = await new CategoryLogic().getCategories({
        perPage: typeof perPage == "number" ? perPage : undefined,
        pageNo: typeof pageNo == "number" ? pageNo : undefined,
        question: question === "ok" ? question : undefined,
      });
      res.json({
        success: true,
        message: "Successful",
        categories: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default CategoriesController;
