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
router.put("/generator-code-app/:whatsapp", async(req, res) => {
    try {
        let wpp = req.params.whatsapp;

        const validateWhatsapp = await usersUtil.findUserByWhatsapp(wpp);
        if (!validateWhatsapp) {
            console.error("Erro ao encontrar whatsapp:", error);
            return res.status(500).send({ message: "Erro ao encontrar whatsapp" });
        }

        const codeRandom = usersUtil.generatorCode();
        const results = await User.findOneAndUpdate({ whatsapp: wpp }, { $set: { codigo_verificacao: codeRandom } });
        res.status(200).send({
            results: {
                message: "Código gerado com sucesso!",
                userId: results['_id']
            }
        });

        usersUtil.sendCodeWpp(validateWhatsapp, codeRandom);
    } catch (error) {
        console.error("Erro ao atualizar código de verificação do usuário:", error);
        res.status(500).send({ message: "Erro ao atualizar código de verificação do usuário" });
    }
});

router.post("/authenticator-code-app", (req, res, next) => {
    let data = req.body;
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

            const response = res.setHeader('Authorization', `${token}`).status(200).send({ msg: "Succesful Login!" });

            // res.cookie('jwt', token, {
            //         httpOnly: false,
            //         secure: false
            //     })
            //     .status(200)
            //     .send({ message: "Succesful Login!" })

        })(req, res, next)
})

router.post("/register-with-wpp", async(req, res) => {
    const query = req.body;
    try {
        const newUser = await User.create(query);
        return res.json({ message: "User created!" });
    } catch (err) {
        console.error("User already exists!", err);
        return res.status(400).json({ error: "User already exists!" });
    }
});

/*
    ====> AUTHENTICATE USER LOGIN IN MANAGER SYSTEM
*/

router.post("/login-system", (req, res, next) => {
    passport.authenticate('local', { session: false },
        (err, user, info) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ err })
            }

            if (!user) {
                const { message } = info
                return res.status(401).json({ message })
            }

            const { _id } = user
            const token = jwt.sign({ _id }, secretKey)
                // const token = jwt.sign({ _id }, secretKey, { expiresIn: '1h' })

            const response = res.setHeader('Authorization', `${token}`).status(200).send({ msg: "Succesful Login!" });

            // res.cookie('jwt', token)
            //     .status(200)
            //     .send({ msg: "Succesful Login!" })

        })(req, res, next)
})


router.post("/register", async(req, res) => {
    const { senha, ...rest } = req.body;
    try {
        const hash = await bcrypt.hash(senha, saltRounds);
        const newUser = await User.create({ senha: hash, ...rest });
        return res.json({ message: "User created!" });
    } catch (err) {
        console.error("User already exists!", err);
        return res.status(400).json({ error: "User already exists!" });
    }
});


router.post("/validar-token", passport.authenticate('jwt', { session: false }), async(req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ msg: 'Token não fornecido.' });
    }

    try {
        return res.status(200).json({ validado: true });
    } catch (error) {
        return res.status(501).json({ validado: false });
    }
});


export default router;