import dotenv from 'dotenv';
dotenv.config(); // load .env variables

export const port = process.env.PORT;
export const database = {
  dbport: process.env.DB_PORT,
  dbhost: process.env.HOST,
  dbuser: process.env.DB_USER,
  dbpassword: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  dbdialect: process.env.dialect
};
