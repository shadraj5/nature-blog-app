import { setSession } from '@/utils/jwt';
import { createContext, useState, useEffect } from 'react';
import axios from '@/utils/axios';

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  const initialize = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        setSession(token);
        const response = await axios.get('/user');
        const { userDetails } = response.data;

        setIsAuthenticated(true);
        setIsInitialized(true);
        setUser(userDetails);
      } else {
        setIsAuthenticated(false);
        setIsInitialized(true);
        setUser(null);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setIsInitialized(true);
      setUser(null);
    }
  };

  useEffect(() => {
    initialize();
  }, [isAuthenticated, isInitialized]);

  const login = async (response) => {
    try {
      const { token, userDetails } = response.data;

      setSession(token);
      setIsAuthenticated(true);
      setUser(userDetails);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    setSession(null);
    setIsAuthenticated(false);
  };

  const values = {
    user,
    isAuthenticated,
    isInitialized,
    initialize,
    login,
    logout
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
