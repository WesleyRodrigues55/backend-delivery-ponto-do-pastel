import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import OrderDetails from "../model/OrderDetails.js";
import passport from 'passport';

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


export default router;