import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routes/Todo.js";
import userRouter from "./routes/User.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import Auth from "./middleware/Auth.js";
import cookieParser from "cookie-parser";
try {
  dotenv.config();
  // Database connection code
  mongoose
    .connect(process.env.MONGODB, {
      dbName: "ToDo-App",
    })
    .then(() => console.log("MongoDb Connected"))
    .catch((error) => console.log("error connecting Database", error));
} catch (error) {
  console.log("mongodb error ", error);
}
// parsing body data into Json
const app = express();
// cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(
  express.json({
    limit: "2kb",
  }),
);
// cookie parser middleware
app.use(cookieParser());
//  rate limiter object
const limiter = rateLimit({
  windowMs: 5 * 300 * 400,
  max: 200,
  message: "too many request please try again later..",
  standardHeaders: true,
  legacyHeaders: false,
});
//  rate limiter middleware
app.use(limiter);
// helmet middleware for security
app.use(helmet());
//  todos routes create delete update reade
app.use("/todo", Auth, todoRouter);
// user routes register and login or logout
app.use("/user", userRouter);
// 404 not found route
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    msg: "Route Not Found",
  });
});
app.listen(process.env.PORT, () =>
  console.log("server is Started ", process.env.PORT),
);
