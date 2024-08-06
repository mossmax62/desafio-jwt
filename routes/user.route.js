import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", userController.login);
router.post("/usuarios", userController.register);
router.get("/usuarios", authMiddleware, userController.usuarios);


export default router;
