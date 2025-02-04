import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction, response } from "express";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { createCourse } from "../services/course.service";
import { redis } from "../utils/redis";
import CourseModel from "../models/coursemodel";
// upload course
export const uploadCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail && typeof thumbnail === "string") {
          const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "courses",
          });
  
          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
        createCourse(data, res, next);
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );

  // edit course
export const editCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body;
  
        const thumbnail = data.thumbnail;
  
        const courseId = req.params.id;
  
        // const courseData = await CourseModel.findById(courseId) as any;
        
  
        if (thumbnail &&  typeof thumbnail === "string") {
          await cloudinary.v2.uploader.destroy(thumbnail);
  
          const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "courses",
          });
  
          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
  
        // if (thumbnail.startsWith("https")) {
        //   data.thumbnail = {
        //     public_id: courseData?.thumbnail.public_id,
        //     url: courseData?.thumbnail.url,
        //   };
        // }
  
        const course = await CourseModel.findByIdAndUpdate(
          courseId,
          {
            $set: data,
          },
          { new: true }
        );
        // await redis.del(courseId);
        await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days
        res.status(201).json({
          success: true,
          course,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );