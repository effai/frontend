import React, { useState } from 'react';
import ShowIcon from '../icons/ShowIcon';
import Link from 'next/link';
import { useAuth, UserData } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AxiosError } from '@/utils/axios';


const Register: React.FC = () => {
  const {register} = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<UserData>({
    username: '',
    password: '',
    email: '',
    avatar: undefined
  });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(formData);
      console.log(formData)
      router.push('/login');
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (axiosErr.response && axiosErr.response.data.message) {
        toast.error(axiosErr.response.data.message); // Show error toast message
      } else {
        toast.error('There was a problem registering. Please try again.');
      }
    }
  };
  return (
    <div className="flex flex-col space-y-12 justify-center px-6 py-8 h-[80%] lg:py-0">
      <div className="w-full shadow border-2 border-gray-500 mx-auto rounded-lg mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-8 bg-container rounded-lg">
          <div>
            <div className="mb-2 text-sm text-center leading-tight tracking-tight text-gray-400">
              SIGN UP
            </div>
            <div className="text-xl font-medium text-center leading-tight tracking-tight text-white">
              Create an account to continue
            </div>
          </div>
          <form className="space-y-4 md:space-y-6" action="/" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-transparent border border-gray-600 text-gray-300 text-md rounded-lg block w-full p-2.5"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-transparent border border-gray-600 text-gray-300 text-md rounded-lg block w-full p-2.5"
                placeholder="Choose a preferred username"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
                Avatar
              </label>
              <input type="file" name="avatar" id="avatar" className="text-white"
                     onChange={(e) => setFormData({...formData, avatar:e.target.files?.[0]})}
                     placeholder="Choose a avatar"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block mb-2 text-sm text-gray-300">Password</label>
                <span
                  className="flex items-center text-xs font-medium text-gray-300 hover:underline dark:text-primary-500">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Choose a strong password"
                  className="border border-gray-600 text-gray-300 rounded-lg block w-full p-2.5 bg-transparent"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <ShowIcon/>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 w-full text-white font-medium rounded-md text-md px-5 py-2.5 text-center">
                Continue
              </button>
              <p className="text-sm text-gray-400 mt-2">
                Already have an account?{' '}
                <Link className="font-medium text-gray-300 hover:underline" href={'/login'}>
                  Login →
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
