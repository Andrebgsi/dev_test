import { Router } from "express";
import { createUser, getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers); // Listar todos os usuários
router.post("/", createUser); // Criar um novo usuário


export default router;