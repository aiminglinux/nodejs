import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profileApi from '../../api/profileApi';
import setAlert from '../../features/Alert/alertAction';

import {
  deleteAccount,
  getProfile,
} from '../../features/Profile/profileAction';
import { clearProfile } from '../../features/Profile/profileSlice';
import { loadUser } from '../../features/User/userAction';
import { logout } from '../../features/User/userSlice';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

const Dashboard = () => {
  const { profile, loading } = useSelector((state) => state.profile);
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleDeleleEduRecord = async (id) => {
    try {
      await profileApi.deleteEducation(id);
      dispatch(getProfile());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleleExpRecord = async (id) => {
    try {
      await profileApi.deleteExperience(id);
      dispatch(getProfile());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
    dispatch(logout());
    dispatch(clearProfile());
    dispatch(setAlert('Your account permanently deleted!'));
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='lager text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'> Welcome {userInfo && userInfo.name}</i>
      </p>
      {profile !== null && profile !== '' ? (
        <>
          <DashboardActions />
          <Experience
            expList={profile.experience}
            onDelete={handleDeleleExpRecord}
          />
          <Education
            eduList={profile.education}
            onDelete={handleDeleleEduRecord}
          />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={handleDeleteAccount}>
              <i className='fas fa-user-minus'></i>
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet set up a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
