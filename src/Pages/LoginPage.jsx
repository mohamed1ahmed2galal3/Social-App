import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { sendLoginData } from '../Services/login';
import { useNavigate, NavLink } from 'react-router-dom';
import { scheme } from '../Schema/LoginSchema';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';




export default function Loginpage() {

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();
  const {handleSubmit , register ,formState} = useForm({
    defaultValues : {
          email:'',
          password:''
    },
    resolver : zodResolver(scheme)
  })
  
  async function signIn(values){
    setLoading(true);
    const response = await sendLoginData(values);
    if(response.error){
      setApiError(response.error)
    }else{
      localStorage.setItem("token" , response.token);
      setIsLoggedIn(true)
      navigate('/')
    }
    setLoading(false);
  }
  return <div className='min-h-screen flex justify-center items-center'>
    <div className='bg-white py-10 px-6 shadow-2xl rounded-2xl'>
      <h2 className='text-2xl'>Log In</h2>
      <form onSubmit={handleSubmit(signIn)} className='mt-8 w-md flex flex-col gap-5'>
        <Input {...register('email')} label="Email" isInvalid={Boolean(formState.errors.email?.message)} errorMessage={formState.errors.email?.message} variant='bordered' labelPlacement ="outside" placeholder = "name@Example.com" type="email"></Input>

        <Input {...register('password')} label="password" isInvalid={Boolean(formState.errors.password?.message)} errorMessage={formState.errors.password?.message} variant='bordered' labelPlacement ="outside" placeholder = "Example@123" type="password"></Input>

        {apiError && <p className='text-red-500 text-center'>{apiError}</p>}
        <Button isLoading={loading} type='submit' variant='solid' color="primary">Log In</Button>
        <p className="text-center text-sm text-gray-600 mt-4">
            If You Haven't Account 
            <NavLink
              to="/register"
              className="ml-1 font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Sign up
            </NavLink>
          </p>
      </form>
    </div>
  </div>
}
