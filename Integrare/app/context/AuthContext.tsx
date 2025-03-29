import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    console.log('AuthContext: Setting isAuthenticated to true');
    setIsAuthenticated(true);
    console.log('AuthContext: New auth state:', { isAuthenticated: true });
  };

  const logout = () => {
    console.log('AuthContext: Setting isAuthenticated to false');
    setIsAuthenticated(false);
    console.log('AuthContext: New auth state:', { isAuthenticated: false });
  };

  console.log('AuthContext: Current auth state:', { isAuthenticated });

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth };
export default AuthProvider; 