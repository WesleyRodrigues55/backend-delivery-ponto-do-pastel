import express from "express";
import { ObjectId } from "mongodb";
import passport from 'passport';
import "../config/db.js";
import Product from "../model/Product.js";


const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/get-products", async(req, res) => {
    try {
        const results = await Product.find({ ativo: 1 });
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto", error);
        res.status(500).send({ message: "Erro ao buscar produto" });
    }
})

router.get("/get-products-pagination", async(req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;

        const results = await Product.find({}).sort({ ativo: -1 }).skip(offset).limit(limit);
        const totalCount = await Product.countDocuments({});

        res.status(200).send({ results, totalCount });
    } catch (error) {
        console.error("Erro ao buscar produtos", error);
        res.status(500).send({ message: "Erro ao buscar produtos" });
    }
});

router.get("/get-products-by-category/:category", async(req, res) => {
    try {
        const category = req.params.category;
        const results = await Product.find({ categoria: category });
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto", error);
        res.status(500).send({ message: "Erro ao buscar produto" });
    }
})

router.get("/product-by-id/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const results = await Product.find({ _id: new ObjectId(id) });
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto pelo id", error);
        res.status(500).send({ message: "Erro ao buscar produto pelo id" });
    }
})

router.get("/product-by-id-and-ingredients/:id", async(req, res) => {
    try {
        const id = req.params.id;

        if (!id) return res.status(400).send({ message: "Erro ao buscar produto pelo ID" });

        const results = await Product.aggregate([{
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

        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto pelo ID", error);
        res.status(500).send({ message: "Erro ao buscar produto pelo ID" });
    }
})

router.post("/insert-product", unauthorized, async(req, res) => {
    try {
        const query = req.body;
        const existsProducts = await Product.findOne({ nome: req.body.nome });

        if (!existsProducts) {
            const newProduct = new Product(query);
            const results = await newProduct.save();
            return res.status(200).send({ message: "Produto cadastro com sucesso!" });
        }

        res.status(400).send({ message: `Produto '${req.body.nome}' já existe na base de dados!` });
    } catch (error) {
        console.error("Erro ao inserir um novo produto:", error);
        res.status(500).send({ message: "Erro ao inserir um novo produto" });
    }
})

router.put("/update-product/:id", unauthorized, async(req, res) => {
    try {
        const id = req.params.id;
        const query = req.body;

        const existsProducts = await Product.findOne({ nome: req.body.nome });

        if (!existsProducts) {
            const results = await Product.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: query });
            return res.status(200).send({ results: results });
        }

        return res.status(400).send({ message: `Produto '${req.body.nome}' já existe na base de dados!` });
    } catch (error) {
        console.error("Erro ao atualizar um  produto:", error);
        res.status(500).send({ message: "Erro ao atualizar um produto" });
    }
})

router.put("/status-product/:id/:ativo", unauthorized, async(req, res) => {
    try {
        const id = req.params.id;
        const activate = req.params.ativo;
        let results;
        if (activate == 1) {
            results = await Product.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: { ativo: 0 } }, { new: true });
        } else {
            results = await Product.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: { ativo: 1 } }, { new: true });
        }

        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao atualizar o ativo do produto:", error);
        res.status(500).send({ message: "Erro ao atualizar o ativo do produto" });
    }
})

export default router;