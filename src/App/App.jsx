import React from 'react';
import { BrowserRouter,Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '_helpers';
import { alertActions } from '_actions';
import { PrivateRoute } from '_components';
import firebase from '_helpers/firebase'

import AdminLayout from "layouts/Admin";

import { LoginPage } from "views/auth/LoginPage";
class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        
        // console.log(alert)
        return (
            <Router history={history}>
                {/* {console.log(history)} */}
            <Switch>
            <PrivateRoute exact path="/" component={AdminLayout} />
            <Route path="/admin/" render={props => <AdminLayout {...props}/>} />
            <Route path="/auth" render={props => <LoginPage {...props} />} />
            <Redirect from="*" to="/" />
            </Switch>
        </Router>

        );
    }
}

function mapState(state) {
    const { alert ,items} = state;
    return { alert,items};
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    putToken : alertActions.putToken,
    getNotification : alertActions.getNotification
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };