import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userRepository.find({ relations: ["posts"] });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  try {
    const newUser = userRepository.create({ firstName, lastName, email });
    await userRepository.save(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};
