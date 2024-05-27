import s3storage from "../utils/s3storage";
class UploadImageService {
  async execute(file: Express.Multer.File): Promise<void> {
    const S3Storage = new s3storage();
    await S3Storage.saveFile(file.filename);
  }
}
export default new UploadImageService();
