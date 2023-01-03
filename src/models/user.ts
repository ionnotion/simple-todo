import { ObjectId } from "mongodb";

export default class User {
    constructor(public email: string, public username: string, public phoneNumber: string, public password: string, public _id?: ObjectId) {}
}