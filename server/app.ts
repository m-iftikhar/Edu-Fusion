import express from "express";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();
export const app = express();
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/userroute"; // Verify path
import courseRouter from "./routes/courseroute"
import cookieParser from "cookie-parser";
import orderRouter from "./routes/orderroute"
import cors from "cors";
import notificationRouter from "./routes/notificationroute";

app.use(cors({ 
  origin: process.env.ORIGIN,
   credentials: true 
  }));
// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());


// Routes
app.use("/api/v1", userRouter,courseRouter,orderRouter,notificationRouter);


// Test route
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "All OK" });
});

// Catch-all route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Error handling (MUST BE LAST)
app.use(ErrorMiddleware);