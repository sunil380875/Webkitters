import { body, param, query } from "express-validator";

const QuestionValidation = {
  create: [
    body("question").not().isEmpty().withMessage("question is required"),
    body("option_one").not().isEmpty().withMessage("option_one is required"),
    body("option_two").not().isEmpty().withMessage("option_two is required"),
    body("option_three")
      .not()
      .isEmpty()
      .withMessage("option_three is required"),
    body("option_four").not().isEmpty().withMessage("option_four is required"),
    body("categoryId")
      .not()
      .isEmpty()
      .withMessage("categoryId is required")
      .isMongoId()
      .withMessage("Invalid id you provided"),
  ],
};
export default QuestionValidation;
