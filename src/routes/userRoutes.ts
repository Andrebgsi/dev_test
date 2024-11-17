import { Router } from "express";
import { createUser } from "../controllers/userController";

const router = Router();


router.post("/", createUser); // Criar um novo usuário


export default router;