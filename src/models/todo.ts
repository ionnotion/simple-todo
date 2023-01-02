import { ObjectId } from "mongodb";

export default class Todo {
    constructor(public title: string, public description: string, public status: boolean, public id?: ObjectId) {}
}