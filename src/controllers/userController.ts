import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to catch Pokemon with 50% probability
const catchPokemon = (): boolean => {
  const randomNum = Math.random(); // Generate a random number between 0 and 1
  return randomNum < 0.5; // If less than 0.5, successful capture
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};
