import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const {isAuthenticated} = useContext(AuthContext);
  const router = useRouter();
  
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
