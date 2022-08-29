import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { alertAction } from '../../store/index';

const Register = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    retypePassword: '',
  });

  const { name, email, password, retypePassword } = formData;

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      console.log('Password does not match!');
      dispatch(
        alertAction.setAlert({
          msg: 'Password does not match',
          alertType: 'danger',
        })
      );
    } else {
      console.log('SUCCESS');
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={formSubmitHandler}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={formChangeHandler}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={formChangeHandler}
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='retypePassword'
            value={retypePassword}
            onChange={formChangeHandler}
            minLength='6'
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
