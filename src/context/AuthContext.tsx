import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axiosClient from '@/utils/axios';
import { toast } from 'react-toastify';

export interface UserData {
  username: string;
  password: string;
  email?: string;
  avatar?: File;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (data: UserData) => Promise<void>;
  logout: () => void;
  user: UserData | undefined;
  register: (data: UserData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: async () => {
  },
  logout: () => {
  },
  user: undefined,
  register: async () => {
  }
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState<UserData | undefined>();
  
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setUser(undefined);
      setIsAuthenticated(false);
    }
  }, []);
  
  const handleAuthentication = async (data: UserData,
    endpoint: string) => {
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('password', data.password);
      if (data.email) {
        formData.append('email', data.email);
      }
      if (data.avatar) {
        formData.append('avatar', data.avatar, data.avatar.name);
      }
      const response = await axiosClient.post(`/${endpoint}`, formData);
      if (response.status === 200) {
        const {access_token} = response.data;
        setCookie('access_token', access_token);
        localStorage.setItem('access_token', access_token);
        setIsAuthenticated(true);
        setUser(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const login = (data: UserData) => handleAuthentication(data, 'login');
  const register = (data: UserData) => handleAuthentication(data, 'register');
  
  const logout = () => {
    removeCookie('access_token');
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setUser(undefined);
    toast.info('You are logged out! Bye =('); // Show logout toast message
  };
  
  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
