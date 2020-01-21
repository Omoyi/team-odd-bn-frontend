/* eslint-disable no-nested-ternary */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import dotenv from 'dotenv';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import resetPasswordView from './containers/user/password/resetPassword';
import forgotPasswordView from './views/auth/forgotPasswordView';
import CreateAccommodationView from './views/accommodation/createAccommodationView';
import store from './redux/store';
import Signup from './containers/user/signup/signup';
import successfulVerification from './containers/user/email/successfulVerification';
import Signin from './containers/user/signin/signin';
import Notfound from './NotFound';
import Requests from './containers/Trips/Requests';
import SocialLogin from './containers/user/social/SocialAuthLogin';
import verifyEmailView from './views/auth/verifyEmailView';
import Dashboard from './views/Dashboard';
import RoundTrip from './containers/trips/RoundTrip';
import './assets/css/App.scss';
import './assets/css/style.scss';
import SingleRequest from './containers/Trips/SingleRequest';
import Profile from './components/Profile';
import './assets/css/style.css';
import LandingPage from './components/LandingPage';
import { isTravelAdmin } from './helpers/isTravelAdmin';

dotenv.config();

axios.defaults.BASE_URL = process.env.BASE_URL;


const App = () => (
  <Provider store={store}>
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/social/auth/success" exact component={SocialLogin} />
          <Route path="/verify-email" exact component={verifyEmailView} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/requests" exact component={Requests} />
          <Route
            path="/requests/:tripRequestId"
            exact
            component={SingleRequest}
          />
          <Route path="/reset-password" exact component={resetPasswordView} />
          <Route path="/forgot-password" exact component={forgotPasswordView} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/verify-email" exact component={verifyEmailView} />
          <Route path="/trips/roundtrip" exact component={RoundTrip} />
          <Route
            path="/successful-verification"
            exact
            component={successfulVerification}
          />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route
            path="/accommodation/create"
            exact
            render={() => (
              isTravelAdmin() ? (
                <CreateAccommodationView />
              ) : (
                <Redirect to="/Dashboard" />
              )
            )}
          />
          <Route component={Notfound} />
        </Switch>
      </div>
      <ToastContainer />
    </Router>
  </Provider>
);

export default App;
