import mongoose from 'mongoose';

import Cart from './Cart.js';
import Ingredient from './Ingredient.js';
import User from './User.js';

const ingredientSchema = new mongoose.Schema({
    ingredient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Ingredient
    },
    nome: {
        type: String,
        required: true,
    }
})

const itemsCartSchema = new mongoose.Schema({
    carrinho_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Cart
    },
    produto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    lista_ingredientes: {
        type: [ingredientSchema],
        required: true,
    },
    quantidade: {
        type: Number,
        required: true,
    },
    preco_unitario: {
        type: String,
        required: true,
    },
    preco_total: {
        type: String,
        required: true,
    },
    observacao: {
        type: String,
        // required: true,
    },
}, {
    versionKey: false
});

const ItemsCart = mongoose.model('ItemsCart', itemsCartSchema, 'itens_carrinho');

export default ItemsCart;