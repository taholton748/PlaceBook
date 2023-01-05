import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import decode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const CurrentUserContext = createContext();

export const useCurrentUserContext = () => useContext(CurrentUserContext);

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({ isAuthenticated: false });
  const [cookies, setCookies, removeCookies] = useCookies(['token', 'user']);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    if (cookies.auth_token) {
      const token = cookies.auth_token;
      const user = decode(token);
      if (!ignore) {
        setCurrentUser({ ...user, isAuthenticated: true });
      }
    }
    return () => { ignore = true; };
  }, [cookies]);

  const loginUser = useCallback((user, token) => {
    setCurrentUser({ ...user, isAuthenticated: true });
    setCookies('auth_token', token, { path: '/' });
  }, [setCurrentUser]);

  const logoutUser = useCallback(() => {
    removeCookies('auth_token');
    setCurrentUser({ isAuthenticated: false });
    navigate('/');
  }, [setCurrentUser]);

  const isLoggedIn = useCallback(() => currentUser.isAuthenticated, [currentUser.isAuthenticated]);

  const value = useMemo(() => ({
    currentUser,
    loginUser,
    logoutUser,
    isLoggedIn
  }), [currentUser, setCurrentUser, isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
