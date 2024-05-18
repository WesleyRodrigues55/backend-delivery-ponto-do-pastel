import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Stock from "../model/Stock.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/get-stock", unauthorized, async(req, res) => {
    try {
        const results = await Stock.find({})

        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar estoque:", error);
        res.status(500).send({ message: "Erro ao buscar estoque" });
    }
});


router.get("/stock-by-id-and-ingredient-name/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const results = await Stock.aggregate([{
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "ingrediente",
                    let: { ingrediente_id: "$ingrediente_id" },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$$ingrediente_id", "$_id"]
                            }
                        }
                    }],
                    as: "ingrediente",
                }
            },
            {
                $project: {
                    "_id": 1,
                    "descricao": 1,
                    "quantidade": 1,
                    "unidade_medida": 1,
                    "valor": 1,
                    "ingrediente._id": 1,
                    "ingrediente.nome": 1,
                }
            }
        ]);
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto pelo id", error);
        res.status(500).send({ message: "Erro ao buscar produto pelo id" });
    }
})

router.post("/insert-stock", unauthorized, async(req, res) => {
    try {
        const query = req.body;
        const existsStocks = await Stock.findOne({ descricao: req.body.descricao });

        if (!existsStocks) {
            const newStock = new Stock(query);
            const results = await newStock.save();
            return res.status(200).send({ message: "Item cadastro com sucesso!" });
        }

        res.status(400).send({ message: `Item '${req.body.descricao}' já existe na base de dados!` });
    } catch (error) {
        console.error("Erro ao inserir um novo Item no estoque:", error);
        res.status(500).send({ message: "Erro ao inserir um novo Item no estoque" });
    }
})

router.put("/update-stock/:id", unauthorized, async(req, res) => {
    try {
        const id = req.params.id;
        const query = req.body;

        const existsStocks = await Stock.findOne({ nome: req.body.descricao });

        if (!existsStocks) {
            const results = await Stock.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: query });
            return res.status(200).send({ results: results });
        }

        return res.status(400).send({ message: `Item '${req.body.descricao}' já existe na base de dados!` });
    } catch (error) {
        console.error("Erro ao atualizar um Item:", error);
        res.status(500).send({ message: "Erro ao atualizar um Item" });
    }
})

export default router;