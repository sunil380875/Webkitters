import { body, param, query } from "express-validator";

const UserValidation = {
  create: [
    body("name").not().isEmpty().withMessage("name is required"),
    body("email").not().isEmpty().withMessage("email is required"),
    body("password").not().isEmpty().withMessage("password is required"),
  ],
  getAll: [
    query("perPage")
      .optional()
      .exists()
      .toInt()
      .isNumeric()
      .withMessage("perPage is need to be a number"),
    query("pageNo")
      .optional()
      .exists()
      .toInt()
      .isNumeric()
      .withMessage("pageNo is need to be a number"),
  ],
};
export default UserValidation;
