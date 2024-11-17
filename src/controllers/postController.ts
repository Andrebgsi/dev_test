import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postRepository.find({ relations: ["user"] });
  res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const post = await postRepository.findOne({ where: { id: +req.params.id }, relations: ["user"] });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, description, userId } = req.body;
  try {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const newPost = postRepository.create({ title, description, user });
    await postRepository.save(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const post = await postRepository.findOneBy({ id: +req.params.id });
  if (!post) return res.status(404).json({ error: "Post not found" });
  postRepository.merge(post, req.body);
  await postRepository.save(post);
  res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = +req.params.id;
  const post = await postRepository.findOneBy({ id: postId });
  if (!post) return res.status(404).json({ error: "Post not found" });
  await postRepository.remove(post);
  res.status(204).send({ message: "Post deleted successfully. Post Id:", postId });
};