import passport from 'passport';
import passportLocal from "passport-local";
import passportJWT from 'passport-jwt';

import bcrypt from 'bcrypt';

import * as jwtConfig from '../../config/jwt';
import Teacher from '../../app/models/teacher';

const LocalStrategy = passportLocal.Strategy;

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async function (email, password, done) {
  const teacher = await Teacher.query().findOne({email: email})
  if (!teacher) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  const result = await teacher.verifyPassword(password);

  if (result) {
    return done(null, teacher);

  } else {
    return done(null, false, { message: 'Incorrect password.' });
  }
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : jwtConfig.secretOrKey
}, async function (jwtPayload, done) {
  const teacher = await eacher.query().findById(jwtPayload.id)
  return done(null, teacher);
}));
