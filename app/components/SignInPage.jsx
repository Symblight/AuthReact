import React, { Component, PropTypes } from 'react'
import { RaisedButton, TextField,  } from 'material-ui'
import '../stylesheets/main.less'

const SignUpPageTest = ({
    onSubmit,
    onChangeValue,
    errors,
    successMessage,
    user
})=>(
    <div className='content-wrap'>
            <div className='content'>
                             <h3>{successMessage}</h3>
            <form  action="/" className='form-container' onSubmit={onSubmit}>

                <TextField
                floatingLabelText="email"
                name='email'
                type='email'
                value={user.email}
                errorText={errors.email}
                onChange={onChangeValue}/>

                <TextField
                floatingLabelText="Password"
                name='password'
                type='password'
                value={user.password}
                errorText={errors.password}
                onChange={onChangeValue}/>
                
                <RaisedButton type='submit' label='Sign In'/>
            </form>
            </div>
        </div>
)

SignUpPageTest.PropTypes={
    onSubmit: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    successMessage: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}

export default SignUpPageTest;