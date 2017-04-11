import React from 'react'
import { Route } from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Auth from './modules/Auth'
import NotFound from './components/NotFound'
import Account from './components/Account'

export const routes = [
        {
            path: '/h',
            component: Home,
            auth: 'public'
        },
        {
            path: '/signin',
            component: SignIn,
            auth: 'private'
        },
        {
            path: '/signup',
            component: SignUp,
            auth: 'private'
        },
        {
            path: '/account',
            component: Account,
            auth: 'private'
        },
        {
            path: '/logout',
            onEnter: (nextState, replace)=>{
                Auth.deauthenticateUser();

                replace('/');
            }
        },
        {
            component: NotFound
        }
];

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
     
    <route.component {...props} routes={route.routes}/>
  )}/>
)

export default RouteWithSubRoutes;