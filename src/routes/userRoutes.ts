import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers); // Listar todos os usuários
router.get("/:id", getUserById); // Obter um usuário pelo ID
router.post("/", createUser); // Criar um novo usuário
router.put("/:id", updateUser); // Atualizar um usuário pelo ID


export default router;