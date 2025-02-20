import { NextFunction,Request,Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { IOrder } from "../models/ordermodel";
import CourseModel,{ICourse} from "../models/coursemodel";
import path from "path";
import ejs from "ejs";
import NotificationModel from "../models/notification.model";
import sendMail from "../utils/sendMail";
import { newOrder,getAllOrdersService } from "../services/order.service";
require("dotenv").config();
import userModel from "../models/usermodel";
import { redis } from "../utils/redis";
// create or
export const createOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
       
      try {
        const { courseId, payment_info } = req.body as IOrder;
  
        // if (payment_info) {
        //   if ("id" in payment_info) {
        //     const paymentIntentId = payment_info.id;
        //     const paymentIntent = await stripe.paymentIntents.retrieve(
        //       paymentIntentId
        //     );
  
        //     if (paymentIntent.status !== "succeeded") {
        //       return next(new ErrorHandler("Payment not authorized!", 400));
        //     }
        //   }
        // }
  
        const user = await userModel.findById(req.user?._id);
  
        const courseExistInUser = user?.courses.some(
          (course: any) => course._id.toString() === courseId
        );
  
        if (courseExistInUser) {
          return next(
            new ErrorHandler("You have already purchased this course", 400)
          );
        }
  
        const course:ICourse | null = await CourseModel.findById(courseId);
  
        if (!course) {
          return next(new ErrorHandler("Course not found", 404));
        }
  
        const data: any = {
          courseId: course._id ,
          userId: user?._id,
          payment_info,
        };
    
  

        
        const mailData = {
          order: {
            _id: course._id.toString().slice(0, 6),
            name: course.name,
            price: course.price,
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          },
        };
  
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/order-confirmation.ejs"),
          { order: mailData }
        );
  
        try {
          if (user) {
            await sendMail({
              email: user.email,
              subject: "Order Confirmation",
              template: "order-confirmation.ejs",
              data: mailData,
            });
          }
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
  
        user?.courses.push(course?._id );
  
        await redis.set(req.user?._id, JSON.stringify(user));
  
        await user?.save();
  
        await NotificationModel.create({
          user: user?._id,
          title: "New Order",
          message: `You have a new order from ${course?.name}`,
        });
  
        course.purchased = course.purchased + 1;
  
        await course.save();
  
        newOrder(data, res, next);
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );

  // get All orders --- only for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);