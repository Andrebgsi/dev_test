import { Router } from "express";
import { createPost, getPosts } from "../controllers/postController";

const router = Router();

router.get("/", getPosts); // Listar todos os posts
router.post("/", createPost); // Criar um novo post

export default router;
