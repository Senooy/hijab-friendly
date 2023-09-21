import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsUserLoggedIn(true);
        setUser(currentUser);
      } else {
        setIsUserLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isUserLoggedIn, setUser, setIsUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
