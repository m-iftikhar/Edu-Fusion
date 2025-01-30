import express, { response } from "express";
import { Request, Response, NextFunction } from 'express';
require("dotenv").config();
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { request } from "http";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/userroute";


app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// routes
app.use('/api/v1',userRouter);

// testing route
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    messgae: "all ok ",
  });
});

app.all('*',(req:Request , res:Response,next:NextFunction)=>{
 const err = new Error (`route ${req.originalUrl} not found`) as any;
 err.statusCode=404;
 next(err);
});

app.use(ErrorMiddleware);
  

