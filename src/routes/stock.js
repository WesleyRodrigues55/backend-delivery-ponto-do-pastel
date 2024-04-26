import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Stock from "../model/Stock.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/stock", unauthorized, async(req, res) => {
    try {
        const results = await Stock.find({})
            .populate({
                path: 'produto_id', //nome da referência no documento
                select: ['nome', 'descricao'] //campos a serem exibidos
            })
            .populate('ingrediente_id'); // ou podemos realizar a referência direta e trazer todos os campos
        res.status(200).send(results);
    } catch (error) {
        console.error("Erro ao buscar estoque:", error);
        res.status(500).send("Erro ao buscar estoque");
    }
});

export default router;