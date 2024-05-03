import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Product from "../model/Product.js";
import passport from 'passport';

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
        const results = await Product.find({}, '_id preco ');
        const productIdAndPrice = results.map(product => ({
            _id: product._id,
            preco: product.preco,
        }));
        res.status(200).send(productIdAndPrice);
    } catch (error) {
        console.error("Erro ao buscar produto pelo nome", error);
        res.status(500).send({ message: "Erro ao buscar produto pelo nome" });
    }
})

router.get("/product-by-category/:category", async (req, res) => {
    try {
        const category = req.params.category;
        category = category.toLowerCase();
        const results = await Product.find({ categoria: { $regex: new RegExp(category, "i") } });
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar produto pelo nome", error);
        res.status(500).send({ message: "Erro ao buscar produto pelo nome" });
    }
})

router.post("/post-product", unauthorized, async (req, res) => {
    try {
        const query = req.body;
        const newProduct = new Product(query);
        const results = await newProduct.save();
        res.status(204).send({ results: results });
    } catch (error) {
        console.error("Erro ao inserir um novo produto:", error);
        res.status(500).send({ message: "Erro ao inserir um novo produto" });
    }
})

router.put("/update-product/:id", unauthorized, async (req, res) => {
    try {
        let id = req.params.id;
        let query = req.body;
        let results = await Product.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: query });
        res.send(results).status(204);
    } catch (error) {
        console.error("Erro ao atualizar um  produto:", error);
        res.status(500).send("Erro ao atualizar um produto");
    }
})


router.delete("/product/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let results = await Product.deleteOne({ _id: new ObjectId(id) });
        res.send(results).status(204);
    } catch (error) {
        console.error("Erro ao atualizar um  produto:", error);
        res.status(500).send("Erro ao atualizar um produto");
    }
})

export default router;