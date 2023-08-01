import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [appAccessToken, setAppAccessToken] = useState(null);

  // Le reste de votre logique d'authentification ici...

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, appAccessToken, setAppAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
