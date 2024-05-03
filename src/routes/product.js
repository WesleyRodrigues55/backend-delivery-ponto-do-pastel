import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Product from "../model/Product.js";

const router = express.Router();

router.get("/product", async (req, res) => {
    try {
        const results = await Product.find({});
        res.status(200).send(results);
    } catch (error) {
        console.error("Erro ao buscar produto", error);
        res.status(500).send("Erro ao buscar produto");
    }
})

router.get("/product/:nome", async (req, res) => {
    try {
        let nome = req.params.nome;
        nome = nome.toLowerCase();
        const results = await Product.find({ nome: { $regex: new RegExp(nome, "i") } });
        res.status(200).send(results);
    } catch (error) {
        console.error("Erro ao buscar produto pelo nome", error);
        res.status(500).send("Erro ao buscar produto pelo nome");
    }
})

router.get("/product-ids/idAndPrice", async (req, res) => {
    try {
        const results = await Product.find({}, '_id preco nome');
        const productIdAndPrice = results.map(product => ({
            _id: product._id,
            preco: product.preco,
            nome: product.nome
        }));
        res.status(200).send(productIdAndPrice);
    } catch (error) {
        console.error("Erro ao buscar IDs de produtos", error);
        res.status(500).send("Erro ao buscar IDs de produtos");
    }
})

router.get("/product-price/price", async (req, res) => {
    try {
        const results = await Product.find({}, 'preco ');
        const productPrice = results.map(product => ({
            preco: product.preco,
        }));
        res.status(200).send(productPrice);
    } catch (error) {
        console.error("Erro ao buscar IDs de produtos", error);
        res.status(500).send("Erro ao buscar IDs de produtos");
    }
})

router.post("/product", async (req, res) => {
    try {
        let query = req.body;
        let newProduct = new Product(query);
        let results = await newProduct.save();
        res.send(results).status(204);
    } catch (error) {
        console.error("Erro ao inserir um novo produto:", error);
        res.status(500).send("Erro ao inserir um novo produto");
    }
})

router.put("/update-product/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let query = req.body;
        await Product.findByIdAndUpdate({ _id: id }, { $set: query });
        let results = await Product.findById({ _id: id })
        res.send(results).status(204);
    } catch (error) {
        console.error("Erro ao atualizar um  produto:", error);
        res.status(500).send("Erro ao atualizar um produto");
    }
})

router.put("/update-product", async (req, res) => {
    try {
        let query = req.body.preco;
        await Product.updateMany({}, { preco: query });
        let results = await Product.find({});

        console.log(query);
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