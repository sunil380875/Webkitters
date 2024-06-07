import { NextFunction, Response } from "express";
import { Locked, Unauthorized } from "http-errors";
import { MIDDLEWARE_REQUEST_TYPE } from "../types/global.types";
import { User } from "../model";
import { JWTLogic } from "../service";

export default class ProtectedMiddleware extends JWTLogic {
  public async protected(
    req: MIDDLEWARE_REQUEST_TYPE,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.headers["authorization"]) throw new Unauthorized("Unauthorized");

      const token = req?.headers?.["authorization"].split(" ")[1];

      if (!token) throw new Unauthorized("Unauthorized");
      const payload = await super.verifyAccessToken(token);
      const user = await User.findById(payload?.id);
      if (!user) throw new Unauthorized("Unauthorized");

      req.payload = payload;
      next();
    } catch (error) {
      next(error);
    }
  }
}
