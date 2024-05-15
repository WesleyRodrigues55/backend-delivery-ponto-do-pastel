import mongoose from 'mongoose';

import User from './User.js'

const cartSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    status_compra: {
        type: String,
        required: true,
        lowercase: true
    },
    data_abertura: {
        type: Date,
        required: true,
    },
    data_fechamento: {
        type: Date,
        required: true,
    },
    valor_total: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

const Cart = mongoose.model('Cart', cartSchema, 'carrinho');

export default Cart;