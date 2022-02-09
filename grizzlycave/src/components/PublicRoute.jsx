import { Redirect, Route } from 'react-router';
import useAuth from '../hooks/useAuth';

export const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !!user ? <Redirect to="/profile" /> : <Component {...props} />
      }
    />
  );
};
