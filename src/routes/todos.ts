import { Router, Request, Response } from "express";
import TodosController from "../controllers/todosController";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("this is todos");
});
