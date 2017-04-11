import express from 'express'
import passport from 'passport'
import validator from 'validator'
import '../config/passport'

const router = express.Router();

function validSignUpForm(payload){
    const errors={};
    let isFormValid= true;
    let message='';

    if (!payload || typeof payload.firstname !== 'string' || payload.firstname.trim().length===0){
        isFormValid = false;
        errors.firstname = 'field not required';
    }

    if (!payload || typeof payload.password!=='string'|| payload.password.trim().length < 8){
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }
    if (!payload || typeof payload.email !=='string' || !validator.isEmail(payload.email)){
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }
    return {
        success: isFormValid,
        message,
        errors
    }
}

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/user/signup', (req, res, next)=>{
    const validationResult = validSignUpForm(req.body);
    if(!validationResult.success){
        return res.status(400).send({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    return passport.authenticate('local.signup', (err, token, userData)=>{
        if (err){
            if (err.name === 'IncorrectCreditalsError'){
                return res.status(409).send({
                    success: false,
                    message: 'Check the form for errors.',
                    errors:{
                        email: err.message
                    }
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up!',
            token,
            user: userData
        });
    })(req,res,next);
});

router.post('/user/signin', (req, res,next)=>{
    const validatorResult = validateLoginForm(req.body);
    if(!validatorResult.success){
        return res.status(400).send({
            success: false,
            message: validatorResult.message,
            errors: validatorResult.errors
        });
    }
    return passport.authenticate('local.signin', (err, token, userData)=>{
        if (err){
            if (err.name==='IncorrectCreditalsError'){
                return res.status(409).send({
                    success: false,
                    message: 'Check the form for errors.',
                    errors:{message:"Invalid email or password." }    
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Could not process the form'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'You have successfully sign in!',
            token,
            user: userData
        });
    })(req,res,next);
});

export default router;