import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Product from "../model/Product.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/get-products", async(req, res) => {
    try {
        const results = await Product.find({});
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
        console.error("Erro ao buscar produto pelo nome", error);
        res.status(500).send({ message: "Erro ao buscar produto pelo nome" });
    }
})

router.get("/product-by-category/:category", async(req, res) => {
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

router.post("/post-product", unauthorized, async(req, res) => {
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

router.put("/update-product/:id", unauthorized, async(req, res) => {
    try {
        const id = req.params.id;
        const query = req.body;
        const results = await Product.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: query });
        res.status(204).send({ results: results });
    } catch (error) {
        console.error("Erro ao atualizar um  produto:", error);
        res.status(500).send({ message: "Erro ao atualizar um produto" });
    }
})

export default router;