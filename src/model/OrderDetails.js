import mongoose from 'mongoose';

const listaEnderecoSchema = new mongoose.Schema({
    bairro: {
        type: String,
        required: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    complemento: {
        type: String,
    },
    referencia: {
        type: String,
    },
});

const listaPagamentoScheme = new mongoose.Schema({
    codigo_pagamento: {
        type: String,
        required: true,
    },
    forma_pagamento: {
        type: String,
        required: true,
        lowercase: true,
    },
    qrcode: {
        type: String,
        required: true,
    },
    status_pagamento: {
        type: String,
        required: true,
        lowercase: true,
    },
    link_pagamento: {
        type: String,
        required: true,
    },
});

const oderDetailsSchema = new mongoose.Schema({
    lista_endereco: {
        type: [listaEnderecoSchema],
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    },
    taxa_entrega: {
        type: Number,
        required: true,
    },
    valor_total: {
        type: Number,
        required: true,
    },
    lista_pagamento: {
        type: [listaPagamentoScheme],
        required: true,
    },
    data_pedido: {
        type: Date,
        required: true,
    },
}, {
    versionKey: false
});

const OrderDetails = mongoose.model('OrderDetails', oderDetailsSchema, 'detalhes_do_pedido');

export default OrderDetails;