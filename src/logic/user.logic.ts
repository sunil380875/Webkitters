import { UploadedFile } from "express-fileupload";
import { User } from "../model";
import { MediaStoreService, PasswordHasServices, JWTLogic } from "../service";
import { NotFound } from "http-errors";
import { Types } from "mongoose";
type SIGNUP_TYPE = {
  name: string;
  email: string;
  password: string;
  photo: UploadedFile;
};
type PROFILE_EDIT_TYPE = {
  name: string;
  email: string;
  photo: UploadedFile;
  id: string;
};
type DATA_TYPE = {
  name: string;
  email: string;
  profilePicture: string;
  profilePicturePath: string;
  role: string;
  token: string;
};
class UserLogic {
  public async signupUser({ name, email, password, photo }: SIGNUP_TYPE) {
    try {
      const photoURL = photo
        ? await new MediaStoreService().uploadMedia({
            file: photo,
            dir: "users",
          })
        : undefined;

      const signup = await User.create({
        name,
        email,
        password,
        profilePicture: photoURL?.url,
        profilePicturePath: photoURL?.path,
      });
      return signup;
    } catch (error) {
      throw error;
    }
  }
  public async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const user = await User.findOne({ email });
      if (!user || !user?.password) {
        throw new Error("User not found");
      }
      const isMatch = new PasswordHasServices().compare(
        password,
        user.password
      );
      if (!isMatch) {
        throw new Error("Invalid password");
      }

      const payload = {
        id: user._id,
        role: user.role,
        email: user.email,
      };

      const token = await new JWTLogic().getAccessToken(payload, "5d");

      const data: DATA_TYPE = {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture || "",
        profilePicturePath: user.profilePicturePath || "",
        role: user.role,
        token,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }
  public async userProfile(id: string) {
    try {
      const user = await User.aggregate([
        {
          $match: {
            $expr: {
              $eq: ["$_id", new Types.ObjectId(id)],
            },
          },
        },
        {
          $project: {
            id: "$_id",
            _id: 0,
            name: "$name",
            email: "$email",
            profilePicture: "$profilePicture",
            profilePicturePath: "$profilePicturePath",
            role: "$role",
          },
        },
      ]);
      if (!user[0].email) throw new NotFound("User not found");
      return user[0];
    } catch (error) {
      throw error;
    }
  }
  public async editUserProfile({ id, name, email, photo }: PROFILE_EDIT_TYPE) {
    try {
      const photoURL = photo
        ? await new MediaStoreService().uploadMedia({
            file: photo,
            dir: "users",
          })
        : undefined;
      const editProfile = await User.findByIdAndUpdate(id, {
        name,
        email,
        profilePicture: photoURL?.url,
        profilePicturePath: photoURL?.path,
      });

      if (editProfile && editProfile?.profilePicturePath) {
        await new MediaStoreService().deleteMedia(
          editProfile?.profilePicturePath
        );
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default UserLogic;
