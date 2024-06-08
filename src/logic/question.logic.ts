import fieldValid from "../middleware/fieldValidation.middleware";
import { Question } from "../model";

type QUESTION_TYPE = {
  question: string;
  option_one: string;
  option_two: string;
  option_three: string;
  option_four: string;
  categoryId: string;
};
class QuestionLogic {
  public async addQuestion({
    question,
    option_one,
    option_two,
    option_three,
    option_four,
    categoryId,
  }: QUESTION_TYPE) {
    try {
      const questionCreate = await Question.create({
        question,
        option_one,
        option_two,
        option_three,
        option_four,
        category: categoryId,
      });
      return questionCreate;
    } catch (error) {
      throw error;
    }
  }
}

export default QuestionLogic;
