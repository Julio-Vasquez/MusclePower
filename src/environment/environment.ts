import * as dotenv from 'dotenv';
dotenv.config();

//mode
export const mode = process.env.NODE_ENV === 'production';
//app
export const appName = process.env.APP_NAME;
export const appHost = process.env.APP_HOST;
export const appPrefix = process.env.APP_URL_PREFIX;
export const appPort = process.env.APP_PORT;
export const JWTKey = process.env.JWT_KEY;
export const hostSite = process.env.HOST_SITE;
