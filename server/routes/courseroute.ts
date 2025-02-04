import express from 'express';
import { editCourse, getAllCourses, getSingleCourse, uploadCourse } from '../controllers/coursecontroller';
import { authorizeRoles, isAutheticated } from '../middleware/auth';

const courseRouter= express.Router();

courseRouter.post("/uploadcourse",isAutheticated,authorizeRoles("admin"), uploadCourse);
courseRouter.put("/editcourse/:id",isAutheticated,authorizeRoles("admin"), editCourse);
courseRouter.get("/getcourse/:id", getSingleCourse);
courseRouter.get("/getallcourse", getAllCourses);






export default courseRouter;