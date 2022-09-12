import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userLogin } from '../../features/User/userAction';


const Register = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  if(isAuthenticated) {
    return <Redirect to='/dashboard'/>
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign in with Your Account
      </p>
      <form className='form' onSubmit={formSubmitHandler}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={formChangeHandler}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={formChangeHandler}
            minLength='6'
            required
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Do not have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Register;
