import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt";
import { collections } from "../config/mongo";
import { ObjectId } from "mongodb";

class LoggedUser {
    constructor (public _id:ObjectId) {}
}

let loggedUser : LoggedUser

export function getUser(): LoggedUser {
	return loggedUser;
}

export async function authentication(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.header("Authorization")?.replace(`Bearer `, ``);

        if(!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

		const { _id } = verifyToken(token);

		let foundUser = await collections.users?.findOne(new ObjectId(_id))

		if (!foundUser) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		loggedUser = { ...loggedUser, _id: foundUser._id };

		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error!" });
	}
}
