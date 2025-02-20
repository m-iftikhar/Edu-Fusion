import express from "express";
import { createOrder,getAllOrders } from "../controllers/ordercontroller";
import { isAutheticated } from "../middleware/auth";
import { authorizeRoles } from "../middleware/auth";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);

orderRouter.get(
    "/get-orders",
    isAutheticated,
    authorizeRoles("admin"),
    getAllOrders
  );


export default orderRouter;