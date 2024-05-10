import express from "express";
import { ObjectId } from "mongodb";
import passport from 'passport';
import "../config/db.js";
import Product from "../model/Product.js";


const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/get-products", async (req, res) => {
    try {
        const results = await Product.find({});
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto", error);
        res.status(500).send({ message: "Erro ao buscar produto" });
    }
})

router.get("/get-products-by-category/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const results = await Product.find({ categoria: category });
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto", error);
        res.status(500).send({ message: "Erro ao buscar produto" });
    }
})

router.get("/product-by-id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const results = await Product.find({ _id: new ObjectId(id) });
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto pelo nome", error);
        res.status(500).send({ message: "Erro ao buscar produto pelo nome" });
    }
})

router.get("/product-by-id-and-ingredients/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const results = await Product.aggregate([
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "ingrediente",
                    localField: "ingrediente",
                    foreignField: "ingrediente_id",
                    as: "ingredientesAdicionais"
                }
            }

        ])
        //agregation
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto pelo nome", error);
        res.status(500).send({ message: "Erro ao buscar produto pelo nome" });
    }
})

router.post("/insert-product", unauthorized, async (req, res) => {
    try {
        const query = req.body;
        const existsProducts = await Product.findOne({ nome: req.body.nome });

        if (!existsProducts) {
            const newProduct = new Product(query);
            const results = await newProduct.save();
            return res.status(200).send({ message: "Produto cadastro com sucesso!" });
        }

        res.status(200).send({ message: `Produto '${req.body.nome}' já existe na base de dados!` });
    } catch (error) {
        console.error("Erro ao inserir um novo produto:", error);
        res.status(500).send({ message: "Erro ao inserir um novo produto" });
    }
})

router.put("/update-product/:id", unauthorized, async (req, res) => {
    try {
        const id = req.params.id;
        const query = req.body;
        const results = await Product.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: query });

        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao atualizar um  produto:", error);
        res.status(500).send({ message: "Erro ao atualizar um produto" });
    }
})


export default router;