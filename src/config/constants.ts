const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;
const JWT_TOKEN = process.env.JET_SECRET;
const CLOUD_NAME = process.env.CLOUDINARY_NAME;
const CLOUD_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const DEFAULT_IMG = process.env.CLOUDINARY_DEFAULT_IMAGE;
const RRESEND_API_KEY = process.env.RESEND_API_KEY;

export {
  MONGODB_URI,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  JWT_TOKEN,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  DEFAULT_IMG,
  RRESEND_API_KEY,
};