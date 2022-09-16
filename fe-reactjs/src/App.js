import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';

import setAuthToken from './utils/setAuthToken';

import './App.css';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import { getUser } from './features/User/userAction';
import { getProfile } from './features/Profile/profileAction';

const App = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(getUser());
      dispatch(getProfile());
    }
  }, [token, dispatch]);

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
