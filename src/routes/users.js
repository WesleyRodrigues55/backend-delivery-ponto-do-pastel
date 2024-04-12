import express from "express";
import db from "../config/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();
const collection = await db.collection("usuario");

// get list users
router.get("/users", async(req, res) => {
    try {
        const results = await collection.find({}).toArray();
        res.status(200).send(results);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).send("Erro ao buscar usuários");
    }
});

// get users with aggregations
router.get("/users-aggreg", async(req, res) => {
    let results = await collection.aggregate([
        { "$project": { "nome": 1, "email": 1, "whatsapp": 1 } },
        { "$sort": { "nome": -1 } },
    ]).toArray();
    res.send(results).status(200);
});

// get user by id
router.get("/users/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const query = { _id: new ObjectId(id) };
        const user = await collection.findOne(query);

        if (!user) {
            res.status(404).send("Usuário não encontrado");
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        res.status(500).send("Erro ao buscar usuário por ID");
    }
});

// insert new user
router.post("/users", async(req, res) => {
    try {
        let query = req.body;
        let results = await collection.insertOne(query);
        res.send(results).status(204);
    } catch (error) {
        console.error("Erro ao inserir um novo usuário:", error);
        res.status(500).send("Erro ao inserir um novo usuário");
    }
})


// updating user
router.put("/users/:id", async(req, res) => {
    try {
        let id = req.params.id;
        let query = req.body;
        let results = await collection.updateOne({ _id: new ObjectId(id) }, { $set: query });
        res.send(results).status(204);
    } catch (error) {
        console.error("Erro ao atualizar um usuário pelo ID:", error);
        res.status(500).send("Erro ao atualizar um usuário pelo ID");
    }
})


router.delete("/users/:id", async(req, res) => {
    try {
        let id = req.params.id;
        let results = await collection.deleteOne({ _id: new ObjectId(id) });
        res.send(results).status(204);
    } catch (error) {
        console.error("Erro ao apagar um usuário pelo ID:", error);
        res.status(500).send("Erro ao apagar um usuário pelo ID");
    }
})






export default router;