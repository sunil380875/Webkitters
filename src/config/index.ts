import { config } from "dotenv";
config();

const configs = {
  PORT: process.env.PORT || "",
  JWT_ACCESS_SECRET: `${process.env.JWT_ACCESS_SECRET}` || "",
  API_VERSION: `api/v1`,
  AWS_ACCESS_KEY: `${process.env.AWS_ACCESS_KEY}` || "",
  AWS_SECRET_KEY: `${process.env.SECRET_KEY}`,
  BUCKET_NAME: `${process.env.BUCKET_NAME}` || "",
  CLOUD_FRONT_DOMAIN: `${process.env.CLOUD_FRONT_DOMAIN}` || "",
  CLOUD_FRONT_DISTRIBUTION_ID:
    `${process.env.CLOUD_FRONT_DISTRIBUTION_ID}` || "",
  REGION: `${process.env.REGION}` || "",
  connectionDB: `${process.env.CONNECTION_DB}` || "",
};

export { configs };
