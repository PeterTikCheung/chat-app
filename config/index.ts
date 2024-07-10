import dotenv from 'dotenv';
dotenv.config();

const config = {
  db: {
    url: 'localhost:27017',
    name: 'chatdb'
  },
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
};
  
export default config;