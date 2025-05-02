import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { LoginForm } from '../components/Auth/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};