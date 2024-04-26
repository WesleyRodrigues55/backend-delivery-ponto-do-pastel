import express from "express";
import "../config/db.js";
import User from "../model/User.js";
import usersUtil from "../utils/users.js";

import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

const router = express.Router();

/*
    -> valida usuário pelo wpp
    -> gera código random para verificação no wpp (futuro)
    -> faz um update na chave "codigo_verificacao" no documento do usuário pelo wpp informado
*/
router.put("/login-app/:whatsapp", async(req, res) => {
    try {
        let wpp = req.params.whatsapp;

        const validateWhatsapp = await usersUtil.findUserByWhatsapp(wpp);
        if (!validateWhatsapp) {
            console.error("Erro ao encontrar whastapp:", error);
            return res.status(500).send("Erro ao encontrar whastapp");
        }

        const codeRandom = usersUtil.generatorCode();
        let results = await User.findOneAndUpdate({ whatsapp: wpp }, { $set: { codigo_verificacao: codeRandom } });
        res.send(results).status(204);
    } catch (error) {
        console.error("Erro ao atualizar código de verificação do usuário:", error);
        res.status(500).send("Erro ao atualizar código de verificação do usuário");
    }
});

/*
    -> recebe o whatsapp informado anteriormente
    -> recebe o código recebido no wpp
    -> valida "whatsapp" e "codigo_verificacao" e gera um toekn de acesso
    -> como é um segundo passo, validar:
        -> wpp e código juntos
*/
router.post("/authenticator-app", (req, res, next) => {

    // 1° validar código recebido com o que tem no banco pelp wpp informado
    // se true => autenticar
    // se false => barrar

    passport.authenticate('local', { session: false },
        (err, user, info) => {
            if (err) {
                return res.status(500).json({ err })
            }

            if (!user) {
                const { message } = info
                return res.status(401).json({ message })
            }

            // Se o usuário estiver cadastrado no banco, ele irá receber um token
            // com validade de 1 hora! Após este tempo, ele não poderá mais acessar
            // as rotas protegidas!
            const { _id } = user
            const token = jwt.sign({ _id }, secretKey, { expiresIn: '1h' })

            res.cookie('jwt', token, {
                    httpOnly: false,
                    secure: false
                })
                .status(200)
                .send({ msg: "Succesful Login!" })

        })(req, res, next)
})

/*
    ====> AUTHENTICATE USER LOGIN IN MANAGER SYSTEM
*/

router.post("/login-system", (req, res, next) => {
    passport.authenticate('local', { session: false },
        (err, user, info) => {
            if (err) {
                return res.status(500).json({ err })
            }

            if (!user) {
                const { message } = info
                return res.status(401).json({ message })
            }

            const { _id } = user
            const token = jwt.sign({ _id }, secretKey, { expiresIn: '1h' })

            res.cookie('jwt', token, {
                    httpOnly: false,
                    secure: false
                })
                .status(200)
                .send({ msg: "Succesful Login!" })

        })(req, res, next)
})

router.post("/register", async(req, res) => {
    const { senha, ...rest } = req.body;
    try {
        const hash = await bcrypt.hash(senha, saltRounds);
        const newUser = await User.create({ senha: hash, ...rest });
        return res.json({ message: "User created!" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: "User already exists!" });
    }
});


export default router;