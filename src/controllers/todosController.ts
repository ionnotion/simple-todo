import { Request, Response } from "express";
import { getUser } from "../middlewares/authentication";
import { collections } from "../config/mongo";
import Todo from "../models/todo";
export default class TodosController {
	static async get(req: Request, res: Response) {
        try {
            const {_id:user_id} = getUser()
        } catch (error) {
            
        }
    }

	static async post(req: Request, res: Response) {
        try {
            const {_id:user_id} = getUser()
            const payload = {
                ...req.body,
                status: false,
                user_id
            }
            const newTodo = payload as Todo
            console.log(newTodo)
            let todoCreation = await collections.todos?.insertOne(newTodo)
            if(!todoCreation) {
                return res.status(400).json({message: "Invalid Input"})
            }
            res.status(201).json(newTodo)
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async getOne(req: Request, res: Response) {}

	static async put(req: Request, res: Response) {}

	static async patch(req: Request, res: Response) {}

	static async delete(req: Request, res: Response) {}
}
