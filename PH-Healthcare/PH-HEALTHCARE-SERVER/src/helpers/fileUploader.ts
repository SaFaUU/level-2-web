import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { IFile, ICloudinaryResponse } from "../app/interfaces/file";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: "dwfd0esmb",
  api_key: "275537889638244",
  api_secret: "y3jc4PGVxm_RNpLcDf7WtG59NgM",
});

const uploadToCloudinary = async (
  file: IFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
