import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import OrderDetails from "../model/OrderDetails.js";
import passport from 'passport';
import UserAddress from "../model/UserAddress.js";
import paymentUtils from "../utils/payment.js"


const unauthorized = passport.authenticate('jwt', { session: false });
const router = express.Router();

router.get("/get-approved-orders", unauthorized, async(req, res) => {
    try {
        const results = await OrderDetails.find({ status_pedido: 'pendente' });
        return res.status(200).send({ results: results });

    } catch (error) {
        console.error("Erro ao inserir um novo Status da entrega do pedido:", error);
        res.status(500).send({ message: "Erro ao inserir um novo Status da entrega do pedido" });
    }
})

router.get("/get-orders-by-id-user/:idUser", unauthorized, async(req, res) => {
    const idUser = req.params.idUser;
    try {
        const results = await OrderDetails.aggregate([{
                $match: {
                    usuario_id: new ObjectId(idUser)
                },
            },
            {
                $project: {
                    "_id": 1,
                    "carrinho_id": 1,
                    "valor_total": 1,
                    "data_pedido": 1,
                    "status_pedido": 1
                }
            },
            {
                $sort: {
                    data_pedido: -1
                }
            }
        ]);

        return res.status(200).send({ results: results });

    } catch (error) {
        console.error("Erro ao busca os pedidos:", error);
        res.status(500).send({ message: "Erro ao busca os pedidos" });
    }
})

router.get("/get-orders-details-by-id-carrinho/:idCarrinho", unauthorized, async(req, res) => {
    const idCarrinho = req.params.idCarrinho;
    try {
        const results = await OrderDetails.aggregate([{
                $match: {
                    carrinho_id: new ObjectId(idCarrinho)
                },
            },
            {
                $lookup: {
                    from: "carrinho",
                    let: { carrinho_id: "$carrinho_id" },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$$carrinho_id", "$_id"]
                            }
                        }
                    }],
                    as: "carrinho",
                }
            },
            {
                $lookup: {
                    from: "itens_carrinho",
                    let: { carrinho_id: "$carrinho_id" },
                    pipeline: [{
                            $match: {
                                $expr: {
                                    $eq: ["$$carrinho_id", "$carrinho_id"]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "produto",
                                let: { produto_id: "$produto_id" },
                                pipeline: [{
                                    $match: {
                                        $expr: {
                                            $eq: ["$$produto_id", "$_id"]
                                        }
                                    }
                                }],
                                as: "produto"
                            }
                        },
                        {
                            $unwind: "$produto"
                        }
                    ],
                    as: "itens_carrinho"
                }
            },
            {
                $project: {
                    "_id": 1,
                    "carrinho.status_compra": 1,
                    "carrinho.data_abertura": 1,
                    "carrinho.taxa_fixa": 1,
                    "carrinho.taxa_fixa": 1,
                    "carrinho.valor_total_com_taxa": 1,
                    "carrinho.valor_total_compra": 1,
                    "itens_carrinho.quantidade": 1,
                    "itens_carrinho.observacao": 1,
                    "itens_carrinho.produto.nome": 1,
                    "itens_carrinho.produto.preco": 1,
                    "itens_carrinho.produto.imagem_produto": 1,
                    "itens_carrinho.lista_ingredientes.nome": 1,
                    "itens_carrinho.lista_ingredientes.valor": 1,
                }
            }
        ]);

        return res.status(200).send({ results: results });

    } catch (error) {
        console.error("Erro ao busca os pedidos:", error);
        res.status(500).send({ message: "Erro ao busca os pedidos" });
    }
})

router.get("/get-orders-details-by-id-user/:idUser", unauthorized, async(req, res) => {
    const idUser = req.params.idUser;
    try {
        const results = await OrderDetails.aggregate([{
                $match: {
                    usuario_id: new ObjectId(idUser)
                },
            },
            {
                $lookup: {
                    from: "carrinho",
                    let: { carrinho_id: "$carrinho_id" },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$$carrinho_id", "$_id"]
                            }
                        }
                    }],
                    as: "carrinho",
                }
            },
            {
                $lookup: {
                    from: "itens_carrinho",
                    let: { carrinho_id: "$carrinho_id" },
                    pipeline: [{
                            $match: {
                                $expr: {
                                    $eq: ["$$carrinho_id", "$carrinho_id"]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "produto",
                                let: { produto_id: "$produto_id" },
                                pipeline: [{
                                    $match: {
                                        $expr: {
                                            $eq: ["$$produto_id", "$_id"]
                                        }
                                    }
                                }],
                                as: "produto"
                            }
                        },
                        {
                            $unwind: "$produto"
                        }
                    ],
                    as: "itens_carrinho"
                }
            },
            // {
            //     $project: {
            //         "_id": 1,
            //         "itens_carrinho.produto.nome": 1,
            //         "itens_carrinho.quantidade": 1,
            //         "itens_carrinho.lista_ingredientes.nome": 1,
            //     }
            // }
        ]);

        return res.status(200).send({ results: results });

    } catch (error) {
        console.error("Erro ao busca os pedidos:", error);
        res.status(500).send({ message: "Erro ao busca os pedidos" });
    }
})

router.post("/insert-orders-details", unauthorized, async(req, res) => {
    try {
        const { endereco_usuario, primeiro_endereco, endereco_usuario_id, lista_pagamento, data_pedido, ...query } = req.body;
        const currentDate = new Date().toISOString();
        let idUserAddres;

        if (primeiro_endereco == 1) {
            const insertUserAddress = new UserAddress(endereco_usuario[0]);
            const resultUserAddress = await insertUserAddress.save();
            idUserAddres = resultUserAddress._id;
        } else {
            idUserAddres = endereco_usuario_id;
            const insertUserAddress = endereco_usuario[0];
            await UserAddress.findByIdAndUpdate({ _id: new ObjectId(idUserAddres) }, { $set: insertUserAddress });
        }

        const insertOrdersDetails = new OrderDetails({ endereco_usuario_id: new ObjectId(idUserAddres), data_pedido: currentDate, ...query });
        const results = await insertOrdersDetails.save();

        // gera payment e retorn id do pagamento
        const dataPayment = await paymentUtils.insertPayment(req.body);

        // codigo_pagamento, image qrcode, link pagamento, status_pagamento
        // pegar informações geradas da compra
        const objUpdateOrderDetailsWithInformationsPayment = {
            "idOrderDetails": results._id,
            "idPagamento": dataPayment.id,
            "statusPagamento": dataPayment.status,
            "imageQrCode64": dataPayment.point_of_interaction.transaction_data.qr_code_base64,
            "linkPagamentoQrCode": dataPayment.point_of_interaction.transaction_data.qr_code,
            "enderecoUsuario": lista_pagamento[0].email_usuario
        }

        // inserir elas em detalhes do pedido (update)
        paymentUtils.updateOrderDetailsWithInformationsPayment(objUpdateOrderDetailsWithInformationsPayment);

        return res.status(200).send({ results: results, id_payment: dataPayment.id });
    } catch (error) {
        console.error("Erro ao inserir um novo Status da entrega do pedido:", error);
        res.status(500).send({ message: "Erro ao inserir um novo Status da entrega do pedido" });
    }
})

export default router;