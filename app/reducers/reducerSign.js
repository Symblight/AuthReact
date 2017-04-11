import { REQUEST_USER_SIGN, SUCCESS_USER_SIGN, INVALID_USER_SIGN, VALID_USER_SIGN } from '../constants/AppConstants.js'

const initialState = {
    message:{
        firstname:'',
        email:'',
        password:''
    },
    successMessage:'',
    user:{},
    isFetching: false,
    didInvalid: false
};

const reducerSign = (state=initialState, action) =>{
    switch(action.type){
        case REQUEST_USER_SIGN:{
            return Object.assign({}, state, {
                isFetching: true,
                didInvalid: false
            });
        }
        case VALID_USER_SIGN:{
            return Object.assign({}, state, {
                message: action.payload.errors,
                successMessage: action.payload.errors.message,
                isFetching: false,
                didInvalid: false
            });
        }
        case SUCCESS_USER_SIGN:{
            return Object.assign({}, state, {
                user: action.payload,
                isFetching: false,
                didInvalid: false
            });
        }
        case INVALID_USER_SIGN:{
            return Object.assign({}, state, {
                isFetching: false,
                didInvalid: false
            });
        }
        default:{
            return state
        }
    }
}

export default reducerSign;