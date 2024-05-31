import mongoose from 'mongoose';

import Cart from './Cart.js';
import User from './User.js';

const listaPagamentoScheme = new mongoose.Schema({
    codigo_pagamento: {
        type: String,
        // required: true,
    },
    forma_pagamento: {
        type: String,
        required: true,
        lowercase: true,
    },
    qrcode: {
        type: String,
        // required: true,
    },
    status_pagamento: {
        type: String,
        // required: true,
        lowercase: true,
    },
    link_pagamento: {
        type: String,
        // required: true,
    },
});

const oderDetailsSchema = new mongoose.Schema({
    carrinho_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Cart
    },
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    endereco_usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
    },
    // valor: {
    //     type: String,
    //     required: true,
    // },
    // taxa_entrega: {
    //     type: String,
    //     required: true,
    // },
    valor_total: {
        type: String,
        required: true,
    },
    lista_pagamento: {
        type: [listaPagamentoScheme],
    },
    data_pedido: {
        type: Date,
        required: true,
    },
    status_pedido: {
        type: String,
    }
}, {
    versionKey: false
});

const OrderDetails = mongoose.model('OrderDetails', oderDetailsSchema, 'detalhes_do_pedido');

export default OrderDetails;