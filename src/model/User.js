import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type: String,
        unique: true,
        required: true,
        select: false,
    },
    whatsapp: {
        type: String,
        required: true,
        unique: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    data_nascimento: {
        type: Date,
        required: true,
    },
    nivel: {
        type: Number,
        required: true,
    },
    ativo: {
        type: Number,
        required: true,
    },
    codigo_verificacao: { type: String, },
    manter_conectado: { type: Number, },
    preferencia_notificacao: { type: [String], },
    termo_politicas: { type: Number, },
}, {
    versionKey: false
});

const User = mongoose.model('User', userSchema, 'usuario');

export default User;