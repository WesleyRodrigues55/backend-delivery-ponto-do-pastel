import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import OrderDetails from "../model/OrderDetails.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();


router.get("/get-approved-orders", unauthorized, async(req, res) => {
    try {
        const results = await OrderDetails.find({ status_pedido: 'aprovado' });
        return res.status(200).send({ results: results });

    } catch (error) {
        console.error("Erro ao inserir um novo Status da entrega do pedido:", error);
        res.status(500).send({ message: "Erro ao inserir um novo Status da entrega do pedido" });
    }
})


export default router;