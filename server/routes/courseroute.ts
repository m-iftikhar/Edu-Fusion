import express from 'express';
import { addAnwser, addQuestion, addReview,deleteCourse, editCourse, getAllCourses,getAdminAllCourses, getCourseByUser, getSingleCourse, uploadCourse,addReplyToReview } from '../controllers/coursecontroller';
import { authorizeRoles, isAutheticated } from '../middleware/auth';

const courseRouter= express.Router();

courseRouter.post("/uploadcourse",isAutheticated,authorizeRoles("admin"), uploadCourse);
courseRouter.put("/editcourse/:id",isAutheticated,authorizeRoles("admin"), editCourse);
courseRouter.get("/getcourse/:id", getSingleCourse);
courseRouter.get("/getallcourse", getAllCourses);
courseRouter.get("/get-course-content/:id", isAutheticated,getCourseByUser);
courseRouter.put("/add-question", isAutheticated, addQuestion);
courseRouter.put("/add-answer", isAutheticated, addAnwser);
courseRouter.put("/add-review/:id", isAutheticated, addReview); // id is courseid
courseRouter.put("/add-reply", isAutheticated,authorizeRoles("admin"),addReplyToReview);
courseRouter.get(
    "/get-admin-courses",
    isAutheticated,
    authorizeRoles("admin"),
    getAdminAllCourses
  );
  courseRouter.delete(
    "/delete-course/:id",
    isAutheticated,
    authorizeRoles("admin"),
    deleteCourse
  );







export default courseRouter;