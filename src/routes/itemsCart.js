import express from "express";
import passport from 'passport';
import "../config/db.js";
import ItemsCart from "../model/ItemsCart.js";

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.post('/add-items-cart', unauthorized, async (req, res) => {
    const query = req.body;
    try {
        const newItemCart = new ItemsCart(query);
        const results = await newItemCart.save();

        //66490773f91d60d7834e08c2
        res.status(200).send({ results: "Item adicionado ao carrinho" });
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        res.status(500).send({ message: 'Erro ao adicionar item ao carrinho' });
    }
});

router.get('/get-items-cart', unauthorized, async (req, res) => {
    try {
        const results = await ItemsCart.find({});
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar itens do carrinho", error);
        res.status(500).send({ message: "Erro ao buscar itens do carrinho" });
    }
});



export default router;