import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

export const createPost = async (req: Request, res: Response) => {
  const { title, description, userId } = req.body;
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const post = postRepository.create({ title, description, user });
  await postRepository.save(post);
  res.status(201).json(post);
};
