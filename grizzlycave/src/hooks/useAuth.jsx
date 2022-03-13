import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthService } from '../services/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('PHPTOKEN')
  );
  const [error, setError] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    async function validateToken() {
      try {
        const user = await AuthService.validateToken();

        if (user.wasSuccessful) {
          setUser(user.data);
        }
      } catch (err) {
        setError(err);
      }
    }

    validateToken();
  }, []);

  const login = (username, password) => {
    setError('');
    AuthService.loginUser({
      username,
      password,
    })
      .then(({ user, token, wasSuccessful, message }) => {
        if (wasSuccessful) {
          setUser(user);
          setIsLoggedIn(true);
          localStorage.setItem('PHPTOKEN', token);
          history.push('/profile');
        } else {
          setError(message);
        }
      })
      .catch((error) => setError(error));
  };

  const signUp = (username, email, password) => {
    AuthService.createUser({
      username,
      email,
      password,
    }).then(({ user, token, wasSuccessful, message }) => {
      if (wasSuccessful) {
        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem('PHPTOKEN', token);
        history.push('/profile');
      } else {
        setError(message);
      }
    })
    .catch((error) => setError(error));
  };

  const logout = () => {
    setUser(undefined);
    setIsLoggedIn(false);
    localStorage.removeItem('PHPTOKEN');
  };
  
  const getProfileData = async () => {
    const data = await AuthService.getUserInfo();
    return data;
  };

  const updateUser = async (username, email, password) => {
    try{
        AuthService.updateUser(
          username,
          email,
          password,
        ).then(({ user }) => {
          setUser(user);
        });
    } catch (err) {
      setError(err);
      logout();
    }
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      error,
      login,
      signUp,
      getProfileData,
      updateUser, 
      isLoggedIn,
      logout,
    }),
    [user, error, isLoggedIn]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
