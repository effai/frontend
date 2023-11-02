import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axiosClient from '@/utils/axios';
import { toast } from 'react-toastify';

export interface UserData {
  uuid: string;
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
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const [user, setUser] = useState<UserData>();
  
  useEffect(() => {
    if (cookies.access_token) {
      const fetchUserData = async () => {
        try {
          const response = await axiosClient.get('/get-user-data', {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`
            }
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(undefined);
          setIsAuthenticated(false);
        }
      };
      
      if (cookies.access_token) {
        fetchUserData();
      } else {
        setUser(undefined);
        setIsAuthenticated(false);
      }
    }
  }, [cookies.access_token]);
  
  
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
        const {token} = response.data;
        setCookie('access_token', token);
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
    setIsAuthenticated(false);
    setUser(undefined);
    toast.info('You are logged out! Bye =(');
  };
  
  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
