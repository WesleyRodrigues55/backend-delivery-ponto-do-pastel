import mongoose from "mongoose";

import Product from "./Product.js"
import Ingredient from "./Ingredient.js"

const stockSchema = new mongoose.Schema({
    produto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    ingrediente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Ingredient
    },
    descricao: {
        type: String,
        required: true,
    },
    quantidade: {
        type: Number,
        required: true,
    },
    unidade_medida: {
        type: String,
        lowercase: true
    },
    valor: {
        type: String,
        required: true,
    },
    ativo: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false
});

const Stock = mongoose.model('Stock', stockSchema, 'estoque');

export default Stock;