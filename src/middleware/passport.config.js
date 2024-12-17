import passport from 'passport';
import jwt from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config(); 

const { PRIVATE_KEY } = process.env; 

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['token'];
        }
        return token;
    };

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY, 
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }));
};

export default initializePassport;
