import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (

    
    // console.log(component);
    // console.log(...rest);
    // localStorage.getItem('user')?
    // <Route path="/admin/" render={props => <component {...props} />} />
    // : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
    
    <Route {...rest} render={props => (
            localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
    )} />
)