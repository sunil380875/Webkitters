import { model, Model, Schema } from "mongoose";
import { PasswordHasServices } from "../service";
import { USER_TYPE } from "../types";

const userSchema = new Schema<USER_TYPE, Model<USER_TYPE>>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },
    email: {
      unique: true,
      type: String,
      index: true,
    },

    password: {
      type: String,
      minlength: [4, "Password should be atleast 4 characters long"],
      maxlength: [100, "Password should be atmost 100 characters long"],
    },
    role: {
      type: String,
      enum: {
        values: ["USER", "ADMIN"],
      },
      default: "USER",
    },
    profilePicture: {
      type: String,
    },
    profilePicturePath: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "BLOCK"],
      },
      default: "ACTIVE",
    },
  },
  { timestamps: true }
).pre<USER_TYPE>("save", async function (next) {
  this.password = this.password
    ? await new PasswordHasServices().hash(this.password)
    : undefined;

  next();
});

const UserSchema = model<USER_TYPE, Model<USER_TYPE>>("User", userSchema);
UserSchema.syncIndexes();
export default UserSchema;
