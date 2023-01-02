import { Request, Response } from "express";
import { collections } from "../config/mongo";
import { ObjectId } from "mongodb";
import User from "../models/user";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";

export default class UsersController {
	static async register(req: Request, res: Response) {
		try {
			req.body.password = hashPassword(req.body.password);

			const newUser = req.body as User;
			const registration = await collections.users?.insertOne(newUser);

			registration
				? res.status(201).json({ message: `Successfully registered!` })
				: res
						.status(500)
						.json({ message: `Failed to register : Internal Server Error.` });
		} catch (error: any) {
			console.error(error);
			const { message } = error;
			res.status(400).json({ message });
		}
	}

	static async login(req: Request, res: Response) {
		try {
			const { credential, password } = req.body;

			const test = ["username", "email", "phoneNumber"];

			let foundUser = await collections.users?.findOne({
				$or: [
					{ username: credential },
					{ email: credential },
					{ phoneNumber: credential },
				],
			});

			if (!foundUser || !comparePassword(password, foundUser.password)) {
				return res.status(400).json({ message: "Invalid credential or password" });
			}

			const access_token = signToken({ _id: foundUser?._id });

            res.status(200).json({Authorization: `Bearer ${access_token}`})
		} catch (error: any) {
			console.error(error);
			res
				.status(500)
				.json({ message: `Failed to login : Internal Server Error` });
		}
	}
}
