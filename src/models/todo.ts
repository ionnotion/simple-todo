import { ObjectId } from "mongodb";

export default class Todo {
	constructor(
		public title: string,
		public description: string,
		public status: boolean,
		public user_id: ObjectId,
		public _id?: ObjectId
	) {}
}
