import express from "express";
import passport from 'passport';
import "../config/db.js";
import ItemsCart from "../model/ItemsCart.js";
import Cart from "../model/Cart.js";
import { ObjectId } from "mongodb";

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();


router.post('/insert_item_in_cart/:idusuario', unauthorized, async(req, res) => {
    const idUser = req.params.idusuario
    try {
        const { carrinho_id, preco_total, ...query } = req.body;

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
            const statusValorTotalCartComTaxa = getCartOpen[0].valor_total_com_taxa;
            const statusValorTotalCart = getCartOpen[0].valor_total_compra;

            const sumValorComTaxa = Number(statusValorTotalCartComTaxa) + Number(preco_total);
            const sumValorCompra = Number(statusValorTotalCart) + Number(preco_total);

            const insertCartOpen = {
                "valor_total_com_taxa": sumValorComTaxa.toString(),
                "valor_total_compra": sumValorCompra.toString()
            }

            await Cart.findByIdAndUpdate({ _id: new ObjectId(idCartExists) }, { $set: insertCartOpen });

            const newItemCart = new ItemsCart({
                carrinho_id: new ObjectId(idCartExists),
                preco_total: preco_total,
                ...query
            });
            const results = await newItemCart.save();
            return res.status(200).send({ message: "Item do carrinho cadastro com sucesso!" });
        } else {
            const now = new Date();
            const taxaFixa = "10"
            const valoTotalComTaxa = Number(preco_total) + Number(taxaFixa);
            const createCart = {
                "usuario_id": new ObjectId(idUser),
                "status_compra": "aberto",
                "data_abertura": now.toISOString(),
                "taxa_fixa": taxaFixa.toString(),
                "valor_total_com_taxa": valoTotalComTaxa.toString(),
                "valor_total_compra": preco_total.toString()
            }
            const newCart = new Cart(createCart);
            const results = await newCart.save();
            const createdId = results._id;

            if (!results) {
                return res.status(400).send({ message: "Não foi possível criar um novo carrinho" });
            } else {
                const newItemCart = new ItemsCart({
                    carrinho_id: new ObjectId(createdId),
                    preco_total: preco_total,
                    ...query
                });
                const results = await newItemCart.save();
                return res.status(200).send({ message: "Carrinho criado com sucesso!" });
            }
        }


    } catch (error) {
        console.error("Erro ao inserir um novo produto:", error);
        res.status(500).send({ message: "Erro ao inserir um novo produto" });
    }
});

router.delete('/delete-item-cart-by-id/:idItemCart', unauthorized, async(req, res) => {
    const idItemsCart = req.params.idItemCart;
    try {

        const searchItemCart = await ItemsCart.find({ _id: new ObjectId(idItemsCart) })
        const carrinhoId = searchItemCart[0].carrinho_id;
        const precoTotalItemCart = searchItemCart[0].preco_total;

        const searchCartByID = await Cart.find({ _id: new ObjectId(carrinhoId) })
        const valorTotalComTaxa = searchCartByID[0].valor_total_com_taxa
        const valorTotalCompra = searchCartByID[0].valor_total_compra
        const sumValorComTaxa = Number(valorTotalComTaxa) - Number(precoTotalItemCart);
        const sumValorCompra = Number(valorTotalCompra) - Number(precoTotalItemCart);

        const updateCartOpen = {
            "valor_total_com_taxa": sumValorComTaxa.toString(),
            "valor_total_compra": sumValorCompra.toString()
        }

        const updatedValuesCart = await Cart.findByIdAndUpdate({ _id: new ObjectId(carrinhoId) }, { $set: updateCartOpen });

        const results = await ItemsCart.deleteMany({ _id: new ObjectId(idItemsCart) })

        if (!results) {
            res.status(400).send({ message: 'Ocorreu um erro em deleter o item do carrinho.' });
        }

        res.status(200).send({ results: results });
    } catch (error) {
        console.error("Erro ao atualizar o ativo do produto:", error);
        res.status(500).send({ message: "Erro ao atualizar o ativo do produto" });
    }
});

export default router;