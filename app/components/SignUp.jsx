import React, { Component } from 'react'
import { RaisedButton, TextField,  } from 'material-ui'
import  api from '../api/index'
import { Redirect } from 'react-router-dom'
import Auth from '../modules/Auth'
import SignUpPage from './SignUpPage'
import { connect } from 'react-redux'
import { fetchSignUpUserData } from '../actions/actionsSign'

class SignUp extends Component{
    constructor(props){
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this);
        this.state={
            errors:{
                email: '',
                password: '',
                firstname:''
            },
            successMessage:'',
            user: {
                email: '',
                password: '',
                firstname:''
            }
        }
    }
    onSubmitForm(e){
        e.preventDefault();
       this.props.onFetchSignUp(this.state.user).then(()=>{
           this.setState({errors:this.props.storeSign.message});
           if (Auth.isUserAuthenticated()) window.location.reload()
        });
    }

    onChangeValue(e){
        const field = e.target.name;
        const user = this.state.user;
        user[field]= e.target.value;
        this.setState({user});
    }

    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (Auth.isUserAuthenticated()){
            return(
                <Redirect to={from}/>
            )
        }
        return <SignUpPage 
                    onSubmit={this.onSubmitForm}
                    onChangeValue={this.onChangeValue}
                    successMessage={this.state.successMessage}
                    errors={this.state.errors}
                    user={this.state.user}
            />
    }
}

const mapStateToProps = (state) => {
    return{
        storeSign: state.Sign,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        onFetchSignUp: (userData)=>dispatch(fetchSignUpUserData(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)