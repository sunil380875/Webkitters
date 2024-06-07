import { body, param, query } from "express-validator";

const CategoryValidation = {
  create: [body("title").not().isEmpty().withMessage("title is required")],
};
export default CategoryValidation;
