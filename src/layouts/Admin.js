
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import firebase from '_helpers/firebase'
import { alertActions } from '_actions';
import { connect } from 'react-redux';
class Admin extends React.Component {
  componentWillMount(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        this.props.getNotification(1);
        this.firbeaseFCM();
    } 

};
    sendTokenToServer(token){
        console.log("send token to server")
        this.props.putToken(token);
    }
firbeaseFCM(){
    const messaging = firebase.messaging();
    messaging.requestPermission().then(()=>{
        return messaging.getToken();
    }).then(currentToken =>{
        // console.log(`tokenFCM : ${currentToken}`);
        if (currentToken) {
            this.sendTokenToServer(currentToken);
        
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            this.firbeaseFCM();
            
        }
    }).catch(err=>{

    })
}


  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      const user = localStorage.getItem('user');
      if(user !=null){
        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return null;
        }
      }else{
        return  <Route  render={props => (

          <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )} />
      }
      
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    const { alert } = this.props;
    
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          inbox = {alert}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/ic_app.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
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

const connectedAdmin = connect(mapState, actionCreators)(Admin);
export  default connectedAdmin  ;
