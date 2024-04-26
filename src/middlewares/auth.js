import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../model/User.js';
import { ObjectId } from 'mongodb';
const secretKey = process.env.SECRET_KEY;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    },
    async function authenticateUser(email, password, done) {
        try {
            // mudar para whatsapp
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: "User doesn't exist" });
            }

            // preciso gerar um cópdigo de validação e inserir esse código no banco vinculado ao perfil do usuário

            // enviar esse código inserido no wpp do usuário


            // em um outro método => receber o código e validar no banco se existe, junto ao número
            // se true => gerar token de acesso
            // se false => acesso não autorizado




            const match = await user.compare(password, user.senha);
            if (!match) {
                return done(null, false, { message: 'Incorrect Password' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async(id, done) => {
    await User.findById({ _id: ObjectId(id) }, (err, user) => {
        done(err, user)
    })
})

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}

passport.use(new JwtStrategy(opts, async(payload, done) => {
    User.findOne({ _id: payload._id })
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            return done(null, { id: user._id });
        })
        .catch(err => {
            return done(err, false);
        });
}))


export default (app) => {
    app.use(passport.initialize())
}