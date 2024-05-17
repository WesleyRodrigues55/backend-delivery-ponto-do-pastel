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


export default router;