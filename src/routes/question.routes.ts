import { Router } from "express";
import { QuestionController } from "../controllers";
import QuestionValidation from "../validation/question.validation";

export default class QuestionRoutes {
  private router: Router;
  private questionController: QuestionController;

  constructor() {
    this.router = Router();
    this.questionController = new QuestionController();
    this.routes();
  }
  private routes() {
    //  create question
    this.router.post(
      "/",
      QuestionValidation.create,
      this.questionController.addQuestion
    );
  }
}
