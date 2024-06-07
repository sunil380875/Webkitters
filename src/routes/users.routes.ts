import { Router } from "express";
import { UserController } from "../controllers";
import UserValidation from "../validation/user.validation";
import ProtectedMiddleware from "../middleware/protected.middleware";

export default class UserRoutes {
  private router: Router;
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
      UserValidation.login,
      this.userController.loginUser
    );
    // user profile get
    this.router.get(
      "/profile",
      new ProtectedMiddleware().protected,
      this.userController.userProfile
    );
    // user profile get
    this.router.put(
      "/profile-edit/:id",
      UserValidation.editProfile,
      new ProtectedMiddleware().protected,
      this.userController.editUserProfile
    );
  }
}
