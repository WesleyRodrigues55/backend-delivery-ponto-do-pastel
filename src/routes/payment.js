import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import { Payment, MercadoPagoConfig } from 'mercadopago';
import paymentUtils from '../utils/payment.js'
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_TOKEN });
const payment = new Payment(client);

const router = express.Router();

// router.post('/insert-payment', unauthorized, async(req, res) => {
//     const { valor_total, tipo_pagamento, email_user } = req.body
//     payment.create({
//             body: {
//                 transaction_amount: Number(valor_total),
//                 description: 'Compra de produtos em Ponto do Pastel',
//                 payment_method_id: tipo_pagamento.toLowerCase(),
//                 payer: {
//                     email: email_user,
//                 },
//             },
//             requestOptions: { idempotencyKey: userUtils.generatorCode() }
//         })
//         .then((result) => {
//             return res.status(200).send({ results: result });
//         })
//         .catch((error) => {
//             console.error("Erro pagamento:", error);
//             res.status(500).send({ message: "Erro pagamento" });
//         });
// });

router.get('/get-status-payment/:id', unauthorized, async(req, res) => {
    const id = req.params.id;
    payment.get({
        id: id,
    }).then((response) => {
        const getPayment = response
        if (getPayment.status == "approved") {
            console.error("status tá aprovado!")
            paymentUtils.getOrderDetailsByIdPaymendAndUpdatedStatusPayment(id, getPayment.status);

            // fecha carrinho
            paymentUtils.closedCartByIdPayment(id);
        } else {
            console.error("n aprovou ainda")
        }
        return res.status(200).send({ results: getPayment });
    }).catch((error) => {
        console.log(error)
        return res.status(500).send({ message: "Error" });
    });
});

export default router;