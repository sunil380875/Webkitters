import { Request } from "express";
import { ROLE } from "./user";

export interface MIDDLEWARE_REQUEST_TYPE extends Request {
  payload?: {
    id: string;
    role: ROLE;
    status: "ACTIVE" | "BLOCK";
    userId: string;
  };
}
