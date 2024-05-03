import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import User from "../model/User.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

// get list users
router.get("/get-users", unauthorized, async(req, res) => {
    try {
        const results = await User.find({});
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).send({ message: "Erro ao buscar usuários" });
    }
});

// get users with aggregations
router.get("/users-aggreg", unauthorized, async(req, res) => {
    try {
        const results = await User.aggregate([
            { "$project": { "nome": 1, "email": 1, "whatsapp": 1 } },
            { "$sort": { "nome": -1 } },
        ]);
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).send({ message: "Erro ao buscar usuários" });
    }
});

// get user by id
router.get("/users-by-id/:id", unauthorized, async(req, res) => {
    const id = req.params.id;
    try {
        const query = { _id: new ObjectId(id) };
        const results = await User.findOne(query);

        if (!results) {
            res.status(404).send({ message: "Usuário não encontrado" });
        } else {
            res.status(200).send({ results: results });
        }
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        res.status(500).send({ message: "Erro ao buscar usuário por ID" });
    }
});


// updating user
router.put("/update-users/:id", unauthorized, async(req, res) => {
    try {
        const id = req.params.id;
        const query = req.body;
        const results = await User.updateOne({ _id: new ObjectId(id) }, { $set: query });
        res.status(204).send({ results: results });
    } catch (error) {
        console.error("Erro ao atualizar um usuário pelo ID:", error);
        res.status(500).send({ message: "Erro ao atualizar um usuário pelo ID" });
    }
})

export default router;