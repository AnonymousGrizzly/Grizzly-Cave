import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        !!user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default GuardedRoute;
