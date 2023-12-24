import { v2 as cloudinary } from 'cloudinary'
import config from '../config'
export const sendImageToCloudinary = () => {
  cloudinary.config({
    cloud_name: config.CLOUDINARY_API_KEY,
    api_key: config.CLOUDINARY_API_SECRET,
    api_secret: config.CLOUDINARY_CLOUD_NAME,
  })
}
