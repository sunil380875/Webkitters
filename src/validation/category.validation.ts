import { body, param, query } from "express-validator";

const CategoryValidation = {
  create: [body("title").not().isEmpty().withMessage("title is required")],
  get: [
    query("perPage")
      .optional()
      .exists()
      .toInt()
      .isNumeric()
      .withMessage("perPage is need to be a number."),
    query("pageNo")
      .optional()
      .exists()
      .toInt()
      .isNumeric()
      .withMessage("pageNo is need to be a number."),
  ],
};
export default CategoryValidation;
