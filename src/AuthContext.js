import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  isUserLoggedIn: false,
  setUser: () => {},
  setIsUserLoggedIn: () => {}
});

export default AuthContext;
