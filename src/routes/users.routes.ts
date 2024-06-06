import { Router } from "express";
// import UserController from "../controllers/user.controller";
// import ProtectedMiddleware from "../middleware/protected.middleware";
// import UserValidation from "../validations/user.validations";
// import { ProtectedMiddleware } from "../middleware";

export default class UserRoutes {
  public router: Router;
  //   private userController: UserController;

  constructor() {
    this.router = Router();
    // this.userController = new UserController();
    this.routes();
  }
  private routes() {
    //  user get
    this.router.get("/", () => {});
  }
}
