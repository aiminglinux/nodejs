import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ comp: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) return <Component {...props} />;
        return <Redirect to='/login' />;
      }}
    />
  );
};

export default PrivateRoute;
