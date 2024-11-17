import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userRepository.find({ relations: ["posts"] });
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userRepository.findOne({ where: { id: +req.params.id }, relations: ["posts"] });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
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

export const updateUser = async (req: Request, res: Response) => {
  const user = await userRepository.findOneBy({ id: +req.params.id });
  if (!user) return res.status(404).json({ error: "User not found" });
  userRepository.merge(user, req.body);
  await userRepository.save(user);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = +req.params.id;
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) return res.status(404).json({ error: "User not found" });
  await userRepository.remove(user);
  res.status(204).send({ message: "User deleted successfully. User Id:", userId });
};
