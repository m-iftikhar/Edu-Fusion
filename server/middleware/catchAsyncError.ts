import { NextFunction, Request, Response } from "express";

export const CatchAsyncError =
  (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };

//   1. `CatchAsyncError` is a wrapper function(higher order function) that catches errors in asynchronous code and automatically passes them to Express's error-handling middleware.  
// 2. It eliminates the need for repetitive `try-catch` blocks in every route.  
// 3. This keeps your code clean and ensures errors are handled centrally without crashing the server.