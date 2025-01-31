import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { TokenExpiredError } from "jsonwebtoken";

export const ErrorMiddleware = (                         
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    // default values fro error ocured
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";




  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

//   JWT expired error
  if (err.name === "TokenExpiredError") {       
    const message = `Json web token is expired, try again`;
    err = new ErrorHandler(message, 400);
  }
  const refresh_token = req.cookies.refresh_token as string;
if (!refresh_token) {
    return next(new ErrorHandler("JWT must be provided", 400));
}

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};