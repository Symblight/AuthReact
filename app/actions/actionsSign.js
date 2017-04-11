import { REQUEST_USER_SIGN, SUCCESS_USER_SIGN, INVALID_USER_SIGN, VALID_USER_SIGN } from '../constants/AppConstants.js'
import api from '../api/index'
import Auth from '../modules/Auth'

const requestSignUser = () =>{
    return{
        type: REQUEST_USER_SIGN
    }
};

const invalidSignUser = () =>{
    return{
        type: INVALID_USER_SIGN
    }
};

const successSignUser = (json) =>{
    return {
        type: SUCCESS_USER_SIGN,
        payload: json.data
    }
};

const validationSignUser = (json) => {
    return{
        type: VALID_USER_SIGN,
        payload: json.data
    }
};

export const fetchSignInUserData = (data)=>{
    return (dispatch)=>{
        dispatch(requestSignUser());
        return api.requestSignIn(data)
            .then(response=>{
                if (response.data.success){
                dispatch(successSignUser(response));
                Auth.authenticateUser(response.token)
                } else {
                    dispatch(validationSignUser(response));
                }
            })
            .catch(()=>invalidSignUser());
    }
};

export const fetchSignUpUserData = (data) =>{
    return (dispatch)=>{
        dispatch(requestSignUser());
        return api.requestSignUp(data)
            .then(response=>{
                if (response.status<400)
                    { 
                        dispatch(successSignUser(response));
                        Auth.authenticateUser(response.token)
                    }
                else {dispatch(validationSignUser(response))}       
            })
            .catch((res)=>{
                dispatch(invalidSignUser());
            });
    }
};