import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import UserAddress from "../model/UserAddress.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get('/get-user-address-by-id/:idUser', async(req, res) => {
    const idUser = req.params.idUser;
    try {
        const results = await UserAddress.find({ usuario_id: new ObjectId(idUser) });
        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao buscar Status da loja", error);
        res.status(500).send({ message: "Erro ao buscar Status da loja" });
    }
})

export default router;