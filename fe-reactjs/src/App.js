import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './features/User/userAction';

// CSS
import './App.css';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
      // store.dispatch(loadUser(localStorage.token));
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    // store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    // window.addEventListener('storage', () => {
    //   if (!localStorage.token) store.dispatch({ type: LOGOUT });
    // });
  }, []);

  return (
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
            <PrivateRoute exact path='/edit-profile' comp={EditProfile} />
            <PrivateRoute exact path='/add-experience' comp={AddExperience} />
            <PrivateRoute exact path='/add-education' comp={AddEducation} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
