import { body, param, query } from "express-validator";

const UserValidation = {
  create: [
    body("name").not().isEmpty().withMessage("name is required"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Email should be a valid email address"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 4, max: 100 })
      .withMessage("Password must be between 4 and 100 characters"),
  ],
  login: [
    body("email")
      .not()
      .isEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Email should be a valid email address"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 4, max: 100 })
      .withMessage("Password must be between 4 and 100 characters"),
  ],
  editProfile: [
    param("id")
      .not()
      .isEmpty()
      .withMessage("id is required")
      .isMongoId()
      .withMessage("Invalid id format"),
    body("email")
      .optional()
      .exists()
      .not()
      .isEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Email should be a valid email address"),
    body("name")
      .optional()
      .exists()
      .not()
      .isEmpty()
      .withMessage("name is required"),
  ],
};
export default UserValidation;
