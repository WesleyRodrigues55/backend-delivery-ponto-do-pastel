import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);
let conn;

try {
    conn = await client.connect();
    console.log("Conexão feita com sucesso!")
} catch (e) {
    console.log("Erro ao conectar ao banco de dados", error);
    console.error(e);
}

let db = conn.db(process.env.DATABASE);

export default db;