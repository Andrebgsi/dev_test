import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  const user = userRepository.create({ firstName, lastName, email });
  await userRepository.save(user);
  res.status(201).json(user);
};
