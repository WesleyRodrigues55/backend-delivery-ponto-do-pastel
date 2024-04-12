import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

let db = conn.db("ponto_do_pastel");

export default db;