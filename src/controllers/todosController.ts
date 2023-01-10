import { Request, Response } from "express";
import { getUser } from "../middlewares/authentication";
import { collections } from "../config/mongo";
import Todo from "../models/todo";
import { ObjectId } from "mongodb";
export default class TodosController {
	static async get(req: Request, res: Response) {
		try {
			const { _id: user_id } = getUser();

			// console.log(user_id);

			let todos = await collections.todos
				?.find({user_id : new ObjectId(user_id)}).toArray() as Todo[];

			// console.log(todos);

			res.status(200).json(todos);
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	}

	static async post(req: Request, res: Response) {
		try {
			const { _id: user_id } = getUser();
			const payload = {
				...req.body,
				status: false,
				user_id,
			};
			const newTodo = payload as Todo;

			let todoCreation = await collections.todos?.insertOne(newTodo);
			if (!todoCreation) {
				return res.status(400).json({ message: "Invalid Input" });
			}
			res.status(201).json(newTodo);
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	}

	static async getOne(req: Request, res: Response) {
		try {
			const { _id } = req.params;

			let todo = (await collections.todos?.findOne({
				_id: new ObjectId(_id),
			})) as Todo;

			if (!todo) {
				return res.status(404).json({ message: "Data not Found" });
			}

			res.status(200).json(todo);
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	}

	static async put(req: Request, res: Response) {
		try {
			const { id : _id } = req.params;
			const payload = { ...req.body } as Todo;
			const updatedTodo = await collections.todos?.updateOne(
				{ _id: new ObjectId(_id) },
				{$set: {...payload}}
			);

			res.status(200).json(updatedTodo);
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	}

	static async patch(req: Request, res: Response) {
		try {
			const { id : _id } = req.params;

			console.log(_id)

			const status =
				req.body.status.toLowerCase() === "completed" ? true : false;

			console.log(status)
			const updatedTodo = await collections.todos?.updateOne(
				{ _id: new ObjectId(_id) },
				{ $set : {status} }
			);


			res.status(200).json(updatedTodo);
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: "Internal Server Error" });
		}
	}

	static async delete(req: Request, res: Response) {
		try {
			const { _id } = req.params;
		} catch (error) {}
	}
}
