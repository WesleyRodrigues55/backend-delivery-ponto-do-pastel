import express from "express";
import passport from 'passport';
import "../config/db.js";
import Ingredient from "../model/Ingredient.js";

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/get-ingredients", async(req, res) => {
    try {
        const results = await Ingredient.find({});
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar um ingrediente", error);
        res.status(500).send({ message: "Erro ao buscar ingrediente" });
    }
})

router.post("/insert-ingredient", unauthorized, async (req, res) => {
    try {
        const query = req.body;
        const existsIngredient = await Ingredient.findOne({ nome: req.body.nome });

        if (!existsIngredient) {
            const newIngredient = new Ingredient(query);
            const results = await newIngredient.save();
            return res.status(200).send({ message: "Ingrediente cadastro com sucesso!" });
        }

        res.status(400).send({ message: `Ingrediente '${req.body.nome}' já existe na base de dados!` });
    } catch (error) {
        console.error("Erro ao inserir um novo produto:", error);
        res.status(500).send({ message: "Erro ao inserir um novo produto" });
    }
})

router.put("/update-ingredient/:id", unauthorized, async (req, res) => {
    try {
        const id = req.params.id;
        const query = req.body;

        const existsIngredient = await Ingredient.findOne({ nome: req.body.nome });

        if (!existsIngredient) {
            const results = await Ingredient.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: query });
            return res.status(200).send({ results: results });
        }

        return res.status(400).send({ message: `Ingrediente '${req.body.nome}' já existe na base de dados!` });
    } catch (error) {
        console.error("Erro ao atualizar um  ingrediente:", error);
        res.status(500).send({ message: "Erro ao atualizar um ingrediente" });
    }
})

router.put("/status-ingredient/:id", unauthorized, async (req, res) => {
    try {
        const id = req.params.id;
        const activate = req.params.ativo;
        let results;
        if (activate == 1) {
            results = await Ingredient.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: { ativo: 0 } }, { new: true });
        } else {
            results = await Ingredient.findByIdAndUpdate({ _id: new ObjectId(id) }, { $set: { ativo: 1 } }, { new: true });
        }

        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao atualizar o ativo do ingrediente:", error);
        res.status(500).send({ message: "Erro ao atualizar o ativo do ingrediente" });
    }
})

export default router;