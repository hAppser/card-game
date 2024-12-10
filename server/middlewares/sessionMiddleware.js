import connectMongo from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const { create } = connectMongo;
const isProduction = process.env.NODE_ENV === "production";

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: process.env.SESSION_COLLECTION_NAME,
    dbName: process.env.DB_NAME,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  },
});

export default sessionMiddleware;
