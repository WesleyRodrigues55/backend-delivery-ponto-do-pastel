import mongoose from 'mongoose';

import User from './User.js'

const userAddressSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    cidade: {
        type: String,
        // required: true,
    },
    bairro: {
        type: String,
        // required: true,
    },
    numero: {
        type: String,
        // required: true,
    },
    complemento: {
        type: String,
        // required: true
    },
    rua: {
        type: String,
        // required: true,
    },
}, {
    versionKey: false
});

const UserAddress = mongoose.model('UserAddress', userAddressSchema, 'endereco_usuario');

export default UserAddress;