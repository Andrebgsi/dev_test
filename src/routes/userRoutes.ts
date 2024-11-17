import { Router } from "express";
import { createUser, getUsers, getUserById } from "../controllers/userController";

const router = Router();

router.get("/", getUsers); // Listar todos os usuários
router.get("/:id", getUserById); // Obter um usuário pelo ID
router.post("/", createUser); // Criar um novo usuário


export default router;