import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { addExperience } from '../../features/Profile/profileAction';

const AddExperience = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { title, company, location, from, to, current, description } = formData;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addExperience(formData)).unwrap();
      history.push('/dashboard');
    } catch (error) {
      console.log('Failed to add', error);
    }
  };

  const [checkbox, setCheckbox] = useState(false);

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      current: !current,
    });
    setCheckbox(!checkbox);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            required
            value={title}
            onChange={handleFormChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            required
            value={company}
            onChange={handleFormChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={handleFormChange}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={handleFormChange}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              checked={current}
              onChange={handleCheckboxChange}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            disabled={checkbox}
            type='date'
            name='to'
            value={to}
            onChange={handleFormChange}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default AddExperience;
