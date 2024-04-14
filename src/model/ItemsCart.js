import mongoose from 'mongoose';

import Ingredient from './Ingredient.js';
import Cart from './Cart.js';
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
        type: Number,
        required: true,
    },
    preco_total: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false
});

const ItemsCart = mongoose.model('ItemsCart', itemsCartSchema, 'itens_carrinho');

export default ItemsCart;