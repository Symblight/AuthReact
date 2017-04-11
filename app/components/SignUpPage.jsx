import React, { Component, PropTypes } from 'react'
import { RaisedButton, TextField,  } from 'material-ui'

const SignUpPageTest = ({
    onSubmit,
    errors,
    successMessage,
    onChangeValue,
    user
})=>(
    <div className='content-wrap'>
            <div className='content'>
                <form action="/" className='form-container' onSubmit={onSubmit}>
                    <TextField   
                    floatingLabelText="First name"
                    name='firstname'
                    errorText={errors.firstname}
                    value={user.firstname}
                    onChange={onChangeValue}
                    />

                    <TextField 
                    floatingLabelText="Email"
                    name='email'
                    value={user.email}
                    onChange={onChangeValue}
                    errorText={errors.email}
                    />

                    <TextField 
                    floatingLabelText="Password"
                    name='password'
                    type='password'
                    value={user.password}
                    errorText={errors.password}
                    onChange={onChangeValue}/>

                    <RaisedButton type='submit' label='Sign up' primary={true}/>
                </form>
            </div>
        </div>
)

SignUpPageTest.PropTypes={
    onSubmit: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    successMessage: PropTypes.string.isRequired
}

export default SignUpPageTest;