import { Router } from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../controllers/postController";

const router = Router();

router.get("/", getPosts); // Listar todos os posts
router.get("/:id", getPostById); // Obter um post pelo ID
router.post("/", createPost); // Criar um novo post
router.put("/:id", updatePost); // Atualizar um post pelo ID
router.delete("/:id", deletePost); // Deletar um post pelo ID

export default router;
