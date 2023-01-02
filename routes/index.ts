import { Router, Request, Response } from "express";
import { router as todoRouter } from "./todos";
import { router as userRouter } from "./users";
const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("this is a express + typescript server");
});

router.use("/todo", todoRouter);
router.use("/user", userRouter);

export default router;
