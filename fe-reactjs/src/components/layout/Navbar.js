import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/User/userSlice';
import { clearProfile } from '../../features/Profile/profileSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(clearProfile());
    dispatch(logout());
  };

  const authLink = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logoutHandler} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const publicLink = (
    <ul>
      <li>
        <a href='!#'>Developers</a>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevKonnector
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLink : publicLink} </>}
    </nav>
  );
};

export default Navbar;
