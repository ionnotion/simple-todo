import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import { connectToDatabase } from "./config/mongo";

dotenv.config();

const app: Express = express();
const port: String = process.env.PORT || "3000";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
	try {
		await connectToDatabase();
        app.use(router);
		app.listen(port, () => {
			console.log(`Express + Typescript server listening on port: ${port}! 🚀`);
		});
	} catch (error) {
		console.log(error);
	}
}

main();
