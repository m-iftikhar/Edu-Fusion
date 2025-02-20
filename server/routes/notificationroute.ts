import express from "express";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notificationcontroller";
import { isAutheticated } from "../middleware/auth";
import { authorizeRoles } from "../middleware/auth";
const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAutheticated,
  authorizeRoles("admin"),
  getNotifications
);
notificationRouter.put(
  "/update-notification/:id",
  isAutheticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRouter;
