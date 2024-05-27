import aws, { S3 } from "aws-sdk";
import path from "path";
import multerConfigure from "../config/multer";
import mime from "mime";
import fs from "fs";
class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1",
    });
  }
  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(multerConfigure.directory, filename);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error("File not found");
    }

    const fileContent = await fs.promises.readFile(originalPath);
    this.client
      .putObject({
        Bucket: "exemplo-aw3",
        Key: filename,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }
}

export default S3Storage;
