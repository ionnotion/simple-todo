import * as mongoDB from "mongodb";

export const collections: {
	todos?: mongoDB.Collection;
	users?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
	const client: mongoDB.MongoClient = new mongoDB.MongoClient(
		process.env.DB_CONN_STRING!
	);

	await client.connect();

	const db: mongoDB.Db = client.db(process.env.DB_NAME!);
    
    const usersCollection: mongoDB.Collection = db.collection("User");
	const todosCollection: mongoDB.Collection = db.collection("Todo");

	collections.todos = todosCollection;
    collections.users = usersCollection

	console.log(
		`Successfully connected to database: ${db.databaseName} and collections: ${usersCollection.collectionName} & ${todosCollection.collectionName}`
	);
}
