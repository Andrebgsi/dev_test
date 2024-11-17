import { Router } from "express";
import { createPost, getPosts, getPostById } from "../controllers/postController";

const router = Router();

router.get("/", getPosts); // Listar todos os posts
router.get("/:id", getPostById); // Obter um post pelo ID
router.post("/", createPost); // Criar um novo post

export default router;
