import { Payment, MercadoPagoConfig } from 'mercadopago';
import "../config/db.js";
import userUtils from './users.js'
import { ObjectId } from "mongodb";
import OrderDetails from "../model/OrderDetails.js";
import Cart from '../model/Cart.js';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_TOKEN });
const payment = new Payment(client);

const insertPayment = async(query) => {
    const { valor_total, lista_pagamento } = query;

    try {
        const result = await payment.create({
            body: {
                transaction_amount: Number(valor_total),
                description: 'Compra de produtos em Ponto do Pastel',
                payment_method_id: lista_pagamento[0].forma_pagamento.toLowerCase(),
                payer: {
                    email: lista_pagamento[0].email_usuario,
                },
            },
            requestOptions: { idempotencyKey: userUtils.generatorCode() }
        })

        console.error("payment generator")
        return result;
    } catch (error) {
        console.error("Erro pagamento:", error);
        throw new Error("Erro pagamento");
    }
}


const updateOrderDetailsWithInformationsPayment = async(data) => {
    const { idOrderDetails, ...query } = data;
    try {

        const updateOrderDetails = await OrderDetails.findByIdAndUpdate({ _id: new ObjectId(idOrderDetails) }, {
            $set: {
                lista_pagamento: [{
                    codigo_pagamento: data.idPagamento,
                    qrcode: data.imageQrCode64,
                    status_pagamento: data.statusPagamento,
                    email_usuario: data.enderecoUsuario,
                    link_pagamento: data.linkPagamentoQrCode
                }]
            }
        })

        return updateOrderDetails;

    } catch (error) {
        console.error(error)
    }
}

const getOrderDetailsByIdPaymendAndUpdatedStatusPayment = async(idPayment, status) => {
    try {
        const updateOrderDetails = await OrderDetails.findOneAndUpdate({ "lista_pagamento.codigo_pagamento": Number(idPayment) }, {
                $set: { "lista_pagamento.$[elem].status_pagamento": "approved" }
            }, { new: true, arrayFilters: [{ "elem.codigo_pagamento": Number(idPayment) }] })
            // console.error(updateOrderDetails)
        return updateOrderDetails;

    } catch (error) {
        console.error(error)
    }
}

const closedCartByIdPayment = async(idPayment) => {
    try {
        const getIdCart = await OrderDetails.find({ "lista_pagamento.codigo_pagamento": Number(idPayment) });
        const idCarrinho = getIdCart[0].carrinho_id;

        const updateStatusCarrinho = await Cart.findByIdAndUpdate({ _id: new ObjectId(idCarrinho) }, {
            $set: { status_compra: "fechado" }
        }, )

        return updateStatusCarrinho;

    } catch (error) {
        console.error(error)
    }
}


export default {
    insertPayment,
    updateOrderDetailsWithInformationsPayment,
    getOrderDetailsByIdPaymendAndUpdatedStatusPayment,
    closedCartByIdPayment
};