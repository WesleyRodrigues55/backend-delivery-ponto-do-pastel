import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import OrderDeliveryStatus from "../model/OrderDeliveryStatus.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();


router.get("/get-order-delivery-status", unauthorized, async(req, res) => {
    try {
        const results = await OrderDeliveryStatus.find({});
        return res.status(200).send({ results: results });

    } catch (error) {
        console.error("Erro ao inserir um novo Status da entrega do pedido:", error);
        res.status(500).send({ message: "Erro ao inserir um novo Status da entrega do pedido" });
    }
})


router.post("/insert-order-delivery-status", unauthorized, async(req, res) => {
    try {
        const query = req.body;

        const newOrderDeliveryStatus = new OrderDeliveryStatus(query);
        const results = await newOrderDeliveryStatus.save();
        return res.status(200).send({ message: "Status da entrega do pedido registrado com sucesso!" });

    } catch (error) {
        console.error("Erro ao inserir um novo Status da entrega do pedido:", error);
        res.status(500).send({ message: "Erro ao inserir um novo Status da entrega do pedido" });
    }
})


export default router;