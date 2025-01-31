import { redis } from "../utils/redis";
import { Response } from "express";

export const getUserById = async (id: string, res: Response) => {
    const userJson = await redis.get(id);
  
    if (userJson) {
      const user = JSON.parse(userJson);
      res.status(201).json({
        success: true,
        user,
      });
    }
  };