import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        // required: true,
        // unique: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    whatsapp: {
        type: String,
        // required: true,
        // unique: true
    },
    cpf: {
        type: String,
        // required: true,
        // unique: true
    },
    data_nascimento: Date,
    senha: String,
    nivel: Number,
    ativo: Boolean,
    codigo_verificacao: String,
    manter_conectado: Boolean,
    localizacao_usuario: {
        latitude: Number,
        longitude: Number
    },
    preferencia_notificacao: [String],
    termo_politicas: Boolean,
}, {
    versionKey: false
});

const User = mongoose.model('User', userSchema, 'usuario');
export default User;