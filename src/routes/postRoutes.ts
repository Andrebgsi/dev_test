import { Router } from "express";
import { PostController } from "../controllers/postController";

const router = Router();

router.get("/", PostController.getAllPosts); // Listar todos os posts
router.get("/:id", PostController.getPostById); // Obter um post pelo ID
router.post("/", PostController.createPost); // Criar um novo post
router.put("/:id", PostController.updatePost); // Atualizar um post pelo ID
router.delete("/:id", PostController.deletePost); // Deletar um post pelo ID

export default router;
