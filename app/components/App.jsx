import React, { Component } from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, MenuItem, RaisedButton } from 'material-ui'
import {BrowserRouter as Router, Route, HashRouter, Link, Switch, Redirect, withRouter } from 'react-router-dom'
import '../stylesheets/main.less'

import SignIn from './SignIn'
import SignUp from './SignUp'
import Account from './Account'
import NotFound from './NotFound'
import Auth from '../modules/Auth'
import Home from './Home'

import RouteWithSubRoutes, { routes }  from '../routers'


export default class App extends Component{
    render(){
        return <Router>
                <div>
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text= 'React app' />
                         </ToolbarGroup>
                         <ToolbarGroup>
                             <MenuItem primaryText='Home' containerElement={<Link to='/'>Home</Link>}/>
                             {
                                 Auth.isUserAuthenticated() ?
                                  (<ToolbarGroup>
                                      <MenuItem primaryText='Logout' containerElement={<Link to='/logout'>Logout</Link>}/>
                                      <MenuItem primaryText='Account' containerElement={<Link to='/account'>Logout</Link>}/>
                                    </ToolbarGroup>
                                  )
                                  :
                                (<ToolbarGroup>
                                    <MenuItem primaryText='Sign in' containerElement={<Link to='/signin'>Sign In</Link>}/>
                                    <MenuItem primaryText='Sign up' containerElement={<Link to='/signup'>Sign Up</Link>}/>
                                </ToolbarGroup>
                                )
                             }
                        </ToolbarGroup>
                    </Toolbar>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path='/signin' component={SignIn}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/logout' component={Logout}/>
                        <PrivateRoute path='/account' component={Account}/>
                        <Route component={NotFound}/>
                    </Switch>       
            </div> 
            </Router>        
    }
}

const PrivateRoute = ({component, rest}) => (
  <Route  {...rest} render={props=>(
      Auth.isUserAuthenticated()?(
      React.createElement(component, props)
      ): (
          <Redirect to={'/signin'}/>
      )
    )}/>
)


class Logout extends Component{
    render(){
        Auth.deauthenticateUser()
        window.location.reload()
        return<Redirect to={'/'}/>
    }
}