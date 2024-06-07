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
      const category = await new CategoryLogic().createCategory({ title });
      res.json({
        success: true,
        message: "Successful",
        category: category,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default CategoriesController;
