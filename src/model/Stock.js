import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    carrinho_id: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    ingrediente_id: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
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
        type: Number,
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