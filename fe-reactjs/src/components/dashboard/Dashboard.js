import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfile } from '../../features/Profile/profileAction';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = () => {
  const { profile, loading } = useSelector((state) => state.profile);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await dispatch(getProfile()).unwrap();
      } catch (error) {
        console.log('ERRORS: ', error);
      }
    };
    fetchProfile();
  }, [dispatch]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='lager text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'> Welcome {userInfo && userInfo.name}</i>
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
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
