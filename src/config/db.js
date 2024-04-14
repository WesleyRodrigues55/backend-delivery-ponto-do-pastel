import mongoose from 'mongoose'

let conn;
try {
    conn = mongoose.connect(process.env.ATLAS_URI || "")
    console.log("Conexão feita com sucesso!")
} catch (error) {
    console.log("Erro ao conectar ao banco de dados", error);
    console.error(e);
}

export default conn;