import { Router, Request, Response } from "express";
import UploadImageService from "../services/UploadImageService";
import multer from "multer";
import multerConfig from "../config/multer";
const routes = Router();
const upload = multer(multerConfig);
routes.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    await UploadImageService.execute;
    return res.send("ok");
  }
);
routes.delete("/:filename");
export default routes;
