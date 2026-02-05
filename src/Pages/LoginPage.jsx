import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import { scheme } from '../Schema/LoginSchema';
import { AuthContext } from '../Context/AuthContext';
import { sendLoginData } from '../Services/login';

export default function LoginPage() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(scheme)
  });

  async function signIn(values) {
    setLoading(true);
    const response = await sendLoginData(values);
    if (response.error) {
      setApiError(response.error);
    } else {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
      navigate('/');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-slate-900 px-3">
      <div className="bg-white dark:bg-slate-900 py-10 px-6 sm:px-10 shadow-2xl rounded-2xl w-full sm:w-100">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white text-center">Log In</h2>

        <form onSubmit={handleSubmit(signIn)} className="mt-8 flex flex-col gap-5">
          <Input
            {...register('email')}
            label="Email"
            placeholder="name@example.com"
            type="email"
            isInvalid={Boolean(formState.errors.email?.message)}
            errorMessage={formState.errors.email?.message}
            variant="bordered"
            labelPlacement="outside"
          />

          <Input
            {...register('password')}
            label="Password"
            placeholder="Example@123"
            type="password"
            isInvalid={Boolean(formState.errors.password?.message)}
            errorMessage={formState.errors.password?.message}
            variant="bordered"
            labelPlacement="outside"
          />

          {apiError && <p className="text-red-500 text-center">{apiError}</p>}

          <Button
            isLoading={loading}
            type="submit"
            variant="solid"
            color="primary"
          >
            Log In
          </Button>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
            Don't have an account?
            <NavLink
              to="/register"
              className="ml-1 font-medium text-blue-500 hover:text-blue-700 hover:underline transition-colors"
            >
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
