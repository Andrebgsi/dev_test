import { Request, Response } from "express";
import { PostService } from "../services/postService";

export class PostController {
  static async createPost(req: Request, res: Response) {
    try {
      const { title, description, userId } = req.body;

      if (!title || !description || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newPost = await PostService.createPost({ title, description, userId });
      return res.status(201).json(newPost);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: error.message || "Error creating post" });
    }
  }

  static async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getAllPosts();
      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching posts" });
    }
  }

  static async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await PostService.getPostById(Number(id));

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching post" });
    }
  }

  static async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedPost = await PostService.updatePost(Number(id), req.body);

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating post" });
    }
  }

  static async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await PostService.deletePost(Number(id));

      if (!success) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error deleting post" });
    }
  }
}
