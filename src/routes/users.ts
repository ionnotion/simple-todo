import { Router, Request, Response } from "express";
import UsersController from "../controllers/usersController";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("this is users");
});

router.post("/register", UsersController.register)
router.post("/login", UsersController.login)
