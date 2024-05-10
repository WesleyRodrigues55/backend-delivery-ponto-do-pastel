import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import StatusStore from "../model/StatusStore.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get('/get-status', async(req, res) => {
    try {
        const results = await StatusStore.find({});
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar Status da loja", error);
        res.status(500).send({ message: "Erro ao buscar Status da loja" });
    }
})

router.put("/update-status/:id", unauthorized, async(req, res) => {
    try {
        const id = req.params.id;
        const query = req.body;

        const results = await StatusStore.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: query });
        return res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao atualizar o status da loja:", error);
        res.status(500).send({ message: "Erro ao atualizar os status da loja" });
    }
})


export default router;