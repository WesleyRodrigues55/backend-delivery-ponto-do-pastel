import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Cart from "../model/Cart.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/get-cart-open/:idUser", unauthorized, async(req, res) => {
    const id = req.params.idUser;
    try {
        const query = { usuario_id: new ObjectId(id), status_compra: 'aberto' };
        const results = await Cart.findOne(query);

        if (!results) {
            res.status(404).send({ message: "Carrinho aberto não encontrado" });
        } else {
            res.status(200).send({ results: results });
        }
    } catch (error) {
        console.error("Erro ao buscar Carrinho em aberto por ID do usuário:", error);
        res.status(500).send({ message: "Erro ao buscar Carrinho em aberto por ID do usuário" });
    }
});

router.get("/get-cart-open-with-items-cart/:idUser", unauthorized, async(req, res) => {
    const id = req.params.idUser;
    try {
        const results = await Cart.aggregate([{
                $match: {
                    usuario_id: new ObjectId(id),
                    status_compra: "aberto"
                }
            },
            {
                $lookup: {
                    from: "itens_carrinho",
                    let: { carrinho_id: "$_id" },
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
                $lookup: {
                    from: "endereco_usuario",
                    let: { endereco_usuario_id: "$usuario_id" },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$$endereco_usuario_id", "$usuario_id"]
                            }
                        }
                    }],
                    as: "endereco_usuario",
                }
            },
            {
                $project: {
                    "_id": 1,
                    "usuario_id": 1,
                    "status_compra": 1,
                    "valor_compra": 1,
                    "valor_total_compra": 1,
                    "taxa_fixa": 1,
                    "valor_total_com_taxa": 1,
                    "itens_carrinho._id": 1,
                    // "itens_carrinho.produto_id": 1,
                    "itens_carrinho.quantidade": 1,
                    "itens_carrinho.preco_total": 1,
                    "itens_carrinho.lista_ingredientes.id": 1,
                    "itens_carrinho.lista_ingredientes.preco": 1,
                    "itens_carrinho.lista_ingredientes.nome": 1,
                    "itens_carrinho.produto.nome": 1,
                    "itens_carrinho.produto._id": 1,
                    "endereco_usuario._id": 1,
                    "endereco_usuario.cidade": 1,
                    "endereco_usuario.bairro": 1,
                    "endereco_usuario.rua": 1,
                    "endereco_usuario.numero": 1,
                    "endereco_usuario.complemento": 1,
                }
            }
        ])

        if (!results) {
            res.status(404).send({ message: "Carrinho aberto não encontrado" });
        } else {
            res.status(200).send({ results: results });
        }
    } catch (error) {
        console.error("Erro ao buscar Carrinho em aberto por ID do usuário:", error);
        res.status(500).send({ message: "Erro ao buscar Carrinho em aberto por ID do usuário" });
    }
});


router.get("/get-cart-by-id/:id", unauthorized, async(req, res) => {
    const id = req.params.id;
    try {
        const results = await Cart.aggregate([{
                $match: {
                    _id: new ObjectId(id),
                }
            },
            {
                $lookup: {
                    from: "itens_carrinho",
                    let: { carrinho_id: "$_id" },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$$carrinho_id", "$carrinho_id"]
                            }
                        }
                    }],
                    as: "itens_carrinho",
                }
            },
            {
                $lookup: {
                    from: "endereco_usuario",
                    let: { endereco_usuario_id: "$usuario_id" },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$$endereco_usuario_id", "$usuario_id"]
                            }
                        }
                    }],
                    as: "endereco_usuario",
                }
            },
            {
                $project: {
                    "_id": 1,
                    "usuario_id": 1,
                    "status_compra": 1,
                    "valor_compra": 1,
                    "valor_total_compra": 1,
                    "taxa_fixa": 1,
                    "valor_total_com_taxa": 1,
                    "itens_carrinho._id": 1,
                    "itens_carrinho.produto_id": 1,
                    "itens_carrinho.quantidade": 1,
                    "itens_carrinho.quantidade": 1,
                    "itens_carrinho.preco_total": 1,
                    "itens_carrinho.lista_ingredientes.id": 1,
                    "itens_carrinho.lista_ingredientes.preco": 1,
                    "endereco_usuario._id": 1,
                    "endereco_usuario.cidade": 1,
                    "endereco_usuario.bairro": 1,
                    "endereco_usuario.rua": 1,
                    "endereco_usuario.numero": 1,
                    "endereco_usuario.complemento": 1,
                }
            }
        ])

        if (!results) {
            res.status(404).send({ message: "Carrinho aberto não encontrado" });
        } else {
            res.status(200).send({ results: results });
        }
    } catch (error) {
        console.error("Erro ao buscar Carrinho em aberto por ID do usuário:", error);
        res.status(500).send({ message: "Erro ao buscar Carrinho em aberto por ID do usuário" });
    }
});


export default router;