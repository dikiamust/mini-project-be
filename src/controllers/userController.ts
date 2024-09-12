import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      success: true,
      message: "All users successfully retrieved",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving users" });
  }
};
