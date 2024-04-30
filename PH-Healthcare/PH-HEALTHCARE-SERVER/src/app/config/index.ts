import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_access_Secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwt_access_expiration: process.env.ACCESS_TOKEN_EXPIRES_IN,
    jwt_refresh_Secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwt_refresh_expiration: process.env.REFRESH_TOKEN_EXPIRES_IN,
    jwt_reset_Secret: process.env.JWT_RESET_PASSWORD_TOKEN,
    jwt_reset_expiration: process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    email: process.env.EMAIL_SENDER,
    password: process.env.EMAIL_SENDER_PASSWORD,
  },
  ssl: {
    store_id: process.env.STORE_ID,
    storePass: process.env.STORE_PASS,
    successUrl: process.env.SUCCESS_URL,
    failUrl: process.env.FAILURE_URL,
    cancelUrl: process.env.CANCEL_URL,
    sslPaymentApi: process.env.SSL_PAYMENT_API,
    sslValidationApi: process.env.SSL_VALIDATION_API,
  },
};
