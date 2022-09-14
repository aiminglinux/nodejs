import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import { Provider, useSelector } from 'react-redux';
import store from './store/index';
import setAuthToken from './utils/setAuthToken';
import { getUserDetails } from './features/User/userAction';

import './App.css';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import editProfile from './components/profile-forms/EditProfile';

const App = () => {
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      store.dispatch(getUserDetails());
    }
  }, [token]);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />

          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' comp={Dashboard} />
              <PrivateRoute exact path='/create-profile' comp={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' comp={editProfile} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
