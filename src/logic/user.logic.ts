import { UploadedFile } from "express-fileupload";
import { User } from "../model";
import { MediaStoreService } from "../service";
type SIGNUP_TYPE = {
  name: string;
  email: string;
  password: string;
  photo: UploadedFile;
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
}

export default UserLogic;
