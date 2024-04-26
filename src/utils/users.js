import "../config/db.js";
import User from "../model/User.js";
import crypto from 'crypto';
import twilio from 'twilio';

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

function sendCodeWpp(nome, code) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages.create({
        body: `Olá ${nome}, \nSeu código de acesso ao ponto do pastel é: ${code}`,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+55' + validateWhatsapp.whatsapp
    }).then(message => {
        console.log('Message sent successfully:', message.sid);
    }).catch(error => {
        console.error('Error sending message:', error);
    });
}

export default {
    findUserByWhatsapp,
    generatorCode,
    sendCodeWpp
};