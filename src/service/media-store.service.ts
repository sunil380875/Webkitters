import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { configs } from "../config";
interface ImageType {
  url: string;
  path: string;
}
export default class MediaStoreService {
  private s3;
  private cloudFont;

  constructor() {
    this.s3 = new S3Client({
      region: configs.REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_KEY,
      },
    });
    this.cloudFont = new CloudFrontClient({
      region: configs.REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_KEY,
      },
    });
  }
  private async invalidateFileCache(filename: string) {
    try {
      const path = [`/${filename}`];
      const cmd = new CreateInvalidationCommand({
        DistributionId: configs.CLOUD_FRONT_DISTRIBUTION_ID,
        InvalidationBatch: {
          CallerReference: new Date().getTime().toString(),
          Paths: { Quantity: path.length, Items: path },
        },
      });
      await this.cloudFont.send(cmd);
    } catch (error) {
      return false;
    }
  }

  async deleteMedia(key: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = {
          Bucket: `${configs.BUCKET_NAME}`,
          Key: key,
        };

        const deleteData = new DeleteObjectCommand({
          ...params,
        });
        // DELETE FROM S3 BUCKET
        await new S3Client({
          region: configs.REGION,
          credentials: {
            accessKeyId: configs.AWS_ACCESS_KEY as string,
            secretAccessKey: configs.AWS_SECRET_KEY as string,
          },
        }).send(deleteData);
        // INVALIDATE THE CLOUD FRONT CACHE
        await this.invalidateFileCache(key);
        return resolve(true);
      } catch (error) {
        new Error();
        return resolve(false);
      }
    });
  }

  public async uploadMedia({
    file,
    dir,
  }: {
    file: UploadedFile;
    dir?: string;
  }): Promise<{ url: string; path: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const fileSplit = file.name.split(".");
        const fileType = fileSplit[fileSplit.length - 1];
        const fileName = `${new Date().getTime()}.${fileType}`;
        const params = {
          Bucket: `${configs.BUCKET_NAME}`,
          Key: `${dir}/${fileName}`,
          Body: file?.data,
          ContentType: file.mimetype,
        };

        const objectSetUp = new PutObjectCommand({
          ...params,
        });
        const data = await new S3Client({
          region: configs.REGION,
          credentials: {
            accessKeyId: configs.AWS_ACCESS_KEY as string,
            secretAccessKey: configs.AWS_SECRET_KEY as string,
          },
        }).send(objectSetUp);
        await this.invalidateFileCache(`${params?.Key}`);

        return resolve({
          path: `${params?.Key}`,
          url: `https://${configs.CLOUD_FRONT_DOMAIN}/${params?.Key}`,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
