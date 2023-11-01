// components/Header.js
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  
  const {isAuthenticated, logout} = useAuth();
  
  
  return (
    <header className="bg-[#18181c] border-b bg-container border-[#969696] text-white p-4">
      <div className="container mx-auto">
        <nav className="flex justify-end items-center">
          <div className="flex space-x-16">
            <Link href="/posts">
              Posts
            </Link>
            {isAuthenticated ?
              <Link href="#" onClick={logout}>
                Log out
              </Link>
              : <div className='flex gap-4 '>
                <Link href="/login">
                  Sign In
                </Link>
                <Link href="/register">
                  Sign Up
                </Link>
              </div>
            }
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
