import { Request } from "express";
import { validationResult } from "express-validator";
import { BadRequest } from "http-errors";

class FieldValidateError {
  errorHandler(req: Request) {
    const errors = validationResult(req);
    if (errors.isEmpty()) return;
    throw new BadRequest(
      errors
        .array()
        .map((errors) => errors.msg)
        .join()
        .replace(/[,]/g, " and ")
    );
  }
}
const fieldValid = new FieldValidateError().errorHandler;
export default fieldValid;
