import { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext


// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <AuthContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;