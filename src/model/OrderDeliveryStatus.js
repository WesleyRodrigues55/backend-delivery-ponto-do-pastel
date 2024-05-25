import mongoose from 'mongoose';

import Cart from './Cart.js';
import OrderDetails from './OrderDetails.js';

const orderDeliveryStatuschema = new mongoose.Schema({
    carrinho_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Cart,
        required: true,
    },
    detalhes_do_pedido_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: OrderDetails,
        required: true,
    },
    status_pedido: {
        type: String,
        required: true
    },
    data_pedido: {
        type: Date,
        required: true,
    },
    tempo_entrega: {
        type: String,
        // required: true
    }
}, {
    versionKey: false
});

const OrderDeliveryStatus = mongoose.model('OrderDeliveryStatus', orderDeliveryStatuschema, 'status_entrega_pedido');

export default OrderDeliveryStatus;