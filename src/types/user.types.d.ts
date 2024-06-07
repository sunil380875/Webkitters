import { Document } from "mongoose";

export type ROLE = "USER" | "ADMIN";

export default interface USER_TYPE extends Document {
  name: string;
  email: string;
  password?: string;
  role: ROLE;
  profilePicture?: string;
  profilePicturePath?: string;
  // status: "ACTIVE" | "BLOCK";
}
