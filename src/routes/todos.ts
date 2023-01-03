import { Router, Request, Response } from "express";
import TodosController from "../controllers/todosController";

export const router = Router();

router.get("/",TodosController.get)
router.get("/:id",TodosController.getOne)

router.post("/",TodosController.post)

router.put("/:id",TodosController.put)

router.patch("/:id",TodosController.patch)

router.delete("/:id",TodosController.delete)