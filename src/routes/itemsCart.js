import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import ItemsCart from "../model/ItemsCart.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.post('/add-itemsCart', unauthorized, async (req, res) => {
    const { carrinho_id, produto_id, lista_ingredientes, quantidade, preco_unitario } = req.body;
    try {
        const precoIngredientes = lista_ingredientes.reduce((total, ing) => total + ing.preco, 0);
        const precoTotal = (preco_unitario + precoIngredientes) * quantidade;
        // talvez não precise fazer a soma aqui, soma feita no front

        const ItemsCart = new ItemsCart({
            carrinho_id: new ObjectId(carrinho_id),
            produto_id: new ObjectId(produto_id),
            lista_ingredientes,
            quantidade,
            preco_unitario,
            preco_total: precoTotal,
        });

        await ItemsCart.save();
        res.status(201).send(cartItem);
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        res.status(500).send({ message: 'Erro ao adicionar item ao carrinho' });
    }
});


export default router;