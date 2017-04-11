import passport from 'passport'
import mongoose from 'mongoose'
var LocalStrategy = require('passport-local').Strategy
import '../models/user'
import jwt from 'jsonwebtoken'

const User = mongoose.model('user');

passport.serializeUser((user, done)=>{
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    console.log(id);
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done)=>{
    User.findOne({'email': email}, (err, user)=>{
        if (err){
            return done(err);
        }
        if (user){
                const error = new Error('email is already used');
                error.name = 'IncorrectCreditalsError';
             return done(error);
            }
        var newUser = new User();
            newUser.firstname= req.body.firstname;
            newUser.password= newUser.encryptPassword(password);
            newUser.email = email;
            newUser.save((err, result)=>{
                if (err){
                   return done(err);
                }
                const payload = {
                    sub: result._id
                }
                const token = jwt.sign(payload, 'config.jwtSecret');
                return done(null, token, newUser);
            });
    }); 
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done)=>{
    User.findOne({'email': email}, (err, user)=>{
        if (err) {return done(err);}
        if (!user) {
            const error = new Error('Incorrect email');
            error.name='IncorrectCreditalsError';

            return done(error);
        }
        if (!user.validPassword(password)){
            const error = new Error('Incorrect password')
            error.name='IncorrectCreditalsError';
            return done(error);
        }
        const payload = {
            sub: user._id
        };
        const token = jwt.sign(payload, 'config.jwtSecret');
        return done(null, token, user)
    });
}));