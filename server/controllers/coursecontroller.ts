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

  // get single course --- without purchasing
export const getSingleCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const courseId = req.params.id;
  
        const isCacheExist = await redis.get(courseId);
  
        if (isCacheExist) {
          const course = JSON.parse(isCacheExist);
          res.status(200).json({
            success: true,
            course,
          });
        } else {
          const course = await CourseModel.findById(req.params.id).select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );
  
          await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days
  
          res.status(200).json({
            success: true,
            course,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );


  // get all courses --- without purchasing
export const getAllCourses = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
  
        res.status(200).json({
          success: true,
          courses,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );