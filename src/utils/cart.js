import "../config/db.js";
import Cart from "../model/Cart.js";
import { ObjectId } from "mongodb";


async function createNewCart(userID) {
    const now = new Date();
    try {
        const query = {
            "usuario_id": new ObjectId(userID),
            "status_compra": "aberto",
            "data_abertura": now.toISOString(),
            "taxa_fixa": "10.00",
            "valor_total_com_taxa": "0.00",
            "valor_total_compra": "0.00"
        }
        const newCart = new Cart(query);
        const results = await newCart.save();
        const createdId = results._id;

        if (!results) {
            throw new Error("Erro ao criar um novo carrinho");
        }
        console.error(createdId)
        return createdId;
    } catch (error) {
        console.error("Erro ao criar um novo carrinho:", error);
        throw new Error("Erro ao criar um novo carrinho");
    }
}



export default {
    createNewCart,
};