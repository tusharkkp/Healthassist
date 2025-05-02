import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await signup(name, email, password);
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
      <div className="flex justify-center mb-6">
        <Heart className="h-10 w-10 text-blue-600" />
      </div>
      
      <h2 className="mt-2 text-2xl font-extrabold text-center text-gray-900">
        Create a new account
      </h2>
      
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{' '}
        <button
          onClick={() => navigate('/login')}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          sign in to your existing account
        </button>
      </p>
      
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  );
};