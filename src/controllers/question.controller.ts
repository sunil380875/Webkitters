import { Request, Response, NextFunction } from "express";
import fieldValid from "../middleware/fieldValidation.middleware";
import { MIDDLEWARE_REQUEST_TYPE } from "../types/global.types";
import QuestionLogic from "../logic/question.logic";
import { UploadedFile } from "express-fileupload";
import xlsx from "xlsx";
import { Category, Question } from "../model";
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
  public async addBulkQuestion(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      fieldValid(req);
      const files = req?.files?.question as UploadedFile;

      const workbook = xlsx.read(files?.data, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any = xlsx.utils.sheet_to_json(worksheet);

      let a = 0;
      let notUploaded = [];
      for (const data of jsonData) {
        const category = await Category.findOne({
          title: data?.category.trim().toUpperCase(),
        });
        if (category) {
          const addData = await Question.create({
            question: data?.question,
            option_one: data?.option_one,
            option_two: data?.option_two,
            option_three: data?.option_three,
            option_four: data?.option_four,
            category: category?._id,
          });
        } else if (!category) {
          notUploaded.push(data);
        }

        a++;
        console.log(a);
      }

      res.json({
        success: true,
        message: "Successful",
        notUploadData: notUploaded,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default QuestionController;
