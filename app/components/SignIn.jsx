import React, { Component } from 'react'
import { RaisedButton, TextField,  } from 'material-ui'
import '../stylesheets/main.less'
import { connect } from 'react-redux'
import { fetchSignInUserData } from '../actions/actionsSign'
import SignInPage from './SignInPage'
import { Redirect } from 'react-router-dom'
import Auth from '../modules/Auth'

class Signin extends Component{
    constructor(props, context){
        super(props, context);
        this.state={
            errors:{
                email: '',
                password: ''
            },
            successMessage:'',
            user: {
                email: '',
                password: ''
            }
        }
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onSubmitForm(e){
        e.preventDefault();
        this.props.onFetchSignIn(this.state.user).then(()=>{
            this.setState({errors: this.props.storeSign.message});
            this.setState({successMessage: this.props.storeSign.successMessage})
            if (Auth.isUserAuthenticated()) window.location.reload()
        })

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
        return <SignInPage 
                    onSubmit={this.onSubmitForm} 
                    onChangeValue={this.onChangeValue}
                    user={this.state.user}
                    successMessage={this.state.successMessage}
                    errors={this.state.errors}
            />
    }
}

const mapStateToProps = (state) => {
    return {
        storeSign: state.Sign
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        onFetchSignIn: (userData)=> dispatch(fetchSignInUserData(userData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin)