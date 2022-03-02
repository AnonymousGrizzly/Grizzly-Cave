import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthService } from '../services/auth';


const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    AuthService.validateToken()
      .then((user) => setUser(user.data))
      .catch((_err) => {
        history.push("/login");
        localStorage.removeItem("PHPTOKEN");
      });
  }, []);

  const login = (username, password) => {
    setError("");
    AuthService.loginUser({
      username,
      password,
    })
      .then(({ user, token, wasSuccessful, message }) => {
        if(!wasSuccessful){
          return setError(message);
        }
        setUser(user);
        localStorage.setItem('PHPTOKEN', token);
        history.push('/profile');
      })
      .catch((error) => setError(error));
  };

  const signUp = (username, email, password) => {
    AuthService.createUser({
      username,
      email,
      password,
    }).then(({ user, token }) => {
      setUser(user);
      localStorage.setItem('PHPTOKEN', token);
      history.push('/profile');
    });
  };

  const getProfileData = async () => {
    const data = await AuthService.getUserInfo();
    return data;
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('PHPTOKEN');
  };

  const memoizedValue = useMemo(
    () => ({
      user,
      error,
      login,
      signUp,
      getProfileData,
      logout,
    }),
    [user, error]
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
