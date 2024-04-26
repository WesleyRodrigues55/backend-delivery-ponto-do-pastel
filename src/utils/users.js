import "../config/db.js";
import User from "../model/User.js";
import crypto from 'crypto';


async function findUserByWhatsapp(wpp) {
    try {
        const results = await User.findOne({ whatsapp: wpp });

        if (!results) {
            throw new Error("Whatsapp não encontrado");
        }
        return results;
    } catch (error) {
        console.error("Erro ao buscar usuário por Whatsapp:", error);
        throw new Error("Erro ao buscar usuário por Whatsapp");
    }
}

function generatorCode() {
    const randomBytes = crypto.randomBytes(3);
    return randomBytes.toString('hex').toUpperCase().slice(0, 6);
}

export default {
    findUserByWhatsapp,
    generatorCode
};