import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import User from "../model/User.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

// get list users
router.get("/users", unauthorized, async(req, res) => {
    try {
        const results = await User.find({});
        res.status(200).send(results);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).send("Erro ao buscar usuários");
    }
});

// get users with aggregations
router.get("/users-aggreg", unauthorized, async(req, res) => {
    try {
        const results = await User.aggregate([
            { "$project": { "nome": 1, "email": 1, "whatsapp": 1 } },
            { "$sort": { "nome": -1 } },
        ]);
        res.send(results).status(200);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).send("Erro ao buscar usuários");
    }
});

// get user by id
router.get("/users/:id", unauthorized, async(req, res) => {
    const id = req.params.id;
    try {
        const query = { _id: new ObjectId(id) };
        const results = await User.findOne(query);

        if (!results) {
            res.status(404).send("Usuário não encontrado");
        } else {
            res.send(results).status(200);
        }
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        res.status(500).send("Erro ao buscar usuário por ID");
    }
});


// updating user
router.put("/users/:id", unauthorized, async(req, res) => {
    try {
        let id = req.params.id;
        let query = req.body;
        let results = await User.updateOne({ _id: new ObjectId(id) }, { $set: query });
        res.send(results).status(204);
    } catch (error) {
        console.error("Erro ao atualizar um usuário pelo ID:", error);
        res.status(500).send("Erro ao atualizar um usuário pelo ID");
    }
})

export default router;