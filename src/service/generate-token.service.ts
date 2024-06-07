import jwt from "jsonwebtoken";

class JWTLogic {
  public async getAccessToken(payload: {}, validity?: string): Promise<string> {
    const token = jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, {
      expiresIn: validity || "5d",
    });
    return token;
  }

  public async verifyAccessToken(token: string): Promise<any> {
    const tokenData = jwt.verify(token, `${process.env.JWT_ACCESS_SECRET}`);

    return tokenData;
  }
}

export default JWTLogic;
