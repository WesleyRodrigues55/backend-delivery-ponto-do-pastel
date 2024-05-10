import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
        lowercase: true,
    },
    ativo: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema, 'ingrediente');

export default Ingredient;