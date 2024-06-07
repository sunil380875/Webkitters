import { Router } from "express";
import { UserController } from "../controllers";
import UserValidation from "../validation/user.validation";
// import ProtectedMiddleware from "../middleware/protected.middleware";

export default class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.routes();
  }
  private routes() {
    //  user signup
    this.router.post(
      "/signup",
      UserValidation.create,
      this.userController.signupUser
    );
    // user login
    this.router.post(
      "/login",
      UserValidation.create,
      this.userController.loginUser
    );
  }
}
