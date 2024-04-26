import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../model/User.js';
import { ObjectId } from 'mongodb';
const secretKey = process.env.SECRET_KEY;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'senha',
    },
    async function authenticateUser(username, password, done) {
        try {
            let user;
            if (/\S+@\S+\.\S+/.test(username)) {
                user = await User.findOne({
                    $and: [
                        { username: username }, { email: username },
                        { $or: [{ username: { $exists: true } }, { email: { $exists: true } }] }
                    ]
                });
            } else {
                user = await User.findOne({
                    $and: [
                        { username: username }, { whatsapp: username },
                        { $or: [{ username: { $exists: true } }, { whatsapp: { $exists: true } }] }
                    ]
                });
            }

            if (!user) {
                return done(null, false, { message: "User doesn't exist" });
            }

            if (/\S+@\S+\.\S+/.test(username)) {
                const match = await user.compare(password, user.senha);
                if (!match) {
                    return done(null, false, { message: 'Incorrect Password' });
                }
            } else {
                if (user.codigo_verificacao !== password) {
                    return done(null, false, { message: 'Incorrect Verification Code' });
                }
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

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