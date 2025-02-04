import express from 'express';
import { editCourse, uploadCourse } from '../controllers/coursecontroller';
import { authorizeRoles, isAutheticated } from '../middleware/auth';

const courseRouter= express.Router();

courseRouter.post("/uploadcourse",isAutheticated,authorizeRoles("admin"), uploadCourse);
courseRouter.put("/editcourse/:id",isAutheticated,authorizeRoles("admin"), editCourse);






export default courseRouter;