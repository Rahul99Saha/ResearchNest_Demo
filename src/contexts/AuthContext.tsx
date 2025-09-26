import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'faculty' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock API call - replace with actual API endpoint
      const response = await mockLogin(email, password);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string, role: string): Promise<boolean> => {
    try {
      // Mock API call - replace with actual API endpoint
      const response = await mockRegister(email, password, name, role);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Mock API functions - replace with actual axios calls
const mockLogin = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock user data
  const mockUsers = [
    { id: '1', email: 'student@test.com', password: 'password', name: 'John Doe', role: 'student' },
    { id: '2', email: 'faculty@test.com', password: 'password', name: 'Dr. Smith', role: 'faculty' },
    { id: '3', email: 'admin@test.com', password: 'password', name: 'Admin User', role: 'admin' }
  ];
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      token: `mock-jwt-token-${user.id}`,
      user: userWithoutPassword
    };
  }
  
  return { success: false };
};

const mockRegister = async (email: string, password: string, name: string, role: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful registration
  const newUser = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name,
    role: role as 'student' | 'faculty' | 'admin'
  };
  
  return {
    success: true,
    token: `mock-jwt-token-${newUser.id}`,
    user: newUser
  };
};