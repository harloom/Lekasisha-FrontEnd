
import React from "react";
import ReactDOM from "react-dom";


import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/admin" render={props => <AdminLayout {...props} />} />
//       <Route path="/auth" render={props => <LoginPage {...props} />} />
//       <Redirect from="/" to="/admin/index" />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
