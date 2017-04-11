import axios from 'axios'

axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 411;
}

export default {
    requestSignIn(data){
        return axios.post('/user/signin', data)
    },
    requestSignUp(data){
        return axios.post('/user/signup', data)
    }
}