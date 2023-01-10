import { Router, Request, Response } from "express";
import { router as todoRouter } from "./todos";
import { router as userRouter } from "./users";
import { authentication } from "../middlewares/authentication";
const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("this is an express + typescript server");
});

router.use("/user", userRouter);

router.use(authentication)

router.use("/todo", todoRouter);

export default router;
