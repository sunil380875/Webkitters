import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { UserLogic } from "../logic";
import fieldValid from "../middleware/fieldValidation.middleware";
class UserController {
  public async signupUser(req: Request, res: Response, next: NextFunction) {
    try {
      fieldValid(req);
      const { name, email, password } = req.body;
      const photo = req?.files?.photo as UploadedFile;

      const signup = await new UserLogic().signupUser({
        name,
        email,
        password,
        photo,
      });
      res.json({
        success: true,
        message: "Signup successful",
        data: signup,
      });
    } catch (error) {
      next(error);
    }
  }
  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const login = await new UserLogic().loginUser({ email, password });
      res.json({
        success: true,
        message: "Login successful",
        data: login,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
