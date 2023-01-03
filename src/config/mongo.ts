import * as mongoDB from "mongodb";

export const collections: {
	todos?: mongoDB.Collection;
	users?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
	const localhost = "mongodb://localhost:27017/"
	const defaultDatabase = "defaultDB"

	const client: mongoDB.MongoClient = new mongoDB.MongoClient(
		process.env.DB_CONN_STRING! || localhost
	);

	await client.connect();

	const db: mongoDB.Db = client.db(process.env.DB_NAME! || defaultDatabase);
    
    const usersCollection: mongoDB.Collection = db.collection("User");
	const todosCollection: mongoDB.Collection = db.collection("Todo");

	collections.todos = todosCollection;
    collections.users = usersCollection

	console.log(
		`Successfully connected to database: ${db.databaseName} and collections: ${usersCollection.collectionName} & ${todosCollection.collectionName}`
	);
}
