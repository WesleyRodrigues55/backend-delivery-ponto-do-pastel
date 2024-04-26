import express from "express";
import "../config/db.js";
import User from "../model/User.js";

import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

const router = express.Router();

router.post("/login", (req, res, next) => {
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

    // const { senha, ...rest } = req.body;

    // // Senha é criptografada e o usuário adicionao ao banco de dados
    // bcrypt.hash(senha, saltRounds)
    //     .then(async(hash) => {
    //         await User.create({ senha: hash, ...rest }, (err, newUser) => {
    //             if (err) {
    //                 console.log(err)
    //                 return res.status(400).json({ error: "User already exists!" })
    //             }

    //             return res.json({ message: "User created!" })
    //         })
    //     })
});


export default router;