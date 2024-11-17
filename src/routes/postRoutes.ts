import { Router } from "express";
import { createPost } from "../controllers/postController";

const router = Router();

router.post("/", createPost); // Criar um novo post

export default router;
