import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import cartUtil from "../utils/cart.js";
import ItemsCart from "../model/ItemsCart.js";
import Cart from "../model/Cart.js";
import passport from 'passport';
import {get } from "mongoose";

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();


router.post('/insert_item_in_cart/:idusuario', unauthorized, async(req, res) => {
    const idUser = req.params.idusuario
    try {
        const { carrinho_id, ...query } = req.body;

        const getCartOpen = await Cart.aggregate([{
            $match: {
                $and: [
                    { usuario_id: new ObjectId(idUser) },
                    { status_compra: "aberto" }
                ]
            }
        }])

        if (getCartOpen != '') {
            const idCartExists = getCartOpen[0]._id;
            const newItemCart = new ItemsCart({ carrinho_id: idCartExists, ...query });
            const results = await newItemCart.save();
            return res.status(200).send({ message: "Item do carrinho cadastro com sucesso!" });
        } else {
            console.error('Carrinho não existe aqui')
            const now = new Date();
            const createCart = {
                "usuario_id": new ObjectId(idUser),
                "status_compra": "aberto",
                "data_abertura": now.toISOString(),
                "taxa_fixa": "10.00",
                "valor_total_com_taxa": "0.00",
                "valor_total_compra": "0.00"
            }
            const newCart = new Cart(createCart);
            const results = await newCart.save();
            const createdId = results._id;

            if (!results) {
                return res.status(400).send({ message: "Não foi possível criar um novo carrinho" });
            } else {
                console.error(createdId)
                const newItemCart = new ItemsCart({ carrinho_id: createdId, ...query });
                const results = await newItemCart.save();
                return res.status(200).send({ message: "Carrinho criado com sucesso!" });
            }
        }


    } catch (error) {
        console.error("Erro ao inserir um novo produto:", error);
        res.status(500).send({ message: "Erro ao inserir um novo produto" });
    }
});

export default router;