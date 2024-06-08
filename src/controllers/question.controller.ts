import { Request, Response, NextFunction } from "express";
import fieldValid from "../middleware/fieldValidation.middleware";
import { MIDDLEWARE_REQUEST_TYPE } from "../types/global.types";
import QuestionLogic from "../logic/question.logic";
class QuestionController {
  public async addQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      fieldValid(req);
      const {
        question,
        option_one,
        option_two,
        option_three,
        option_four,
        categoryId,
      } = req?.body;
      const questionCreate = await new QuestionLogic().addQuestion({
        question,
        option_one,
        option_two,
        option_three,
        option_four,
        categoryId,
      });
      res.json({
        success: true,
        message: "Successful",
        data: questionCreate,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default QuestionController;
