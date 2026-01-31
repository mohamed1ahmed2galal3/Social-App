import React, { useState } from 'react'
import {Button} from "@heroui/react";
import {Input} from "@heroui/react";
import {Select, SelectItem} from "@heroui/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod"
import { sendRegisterDate } from '../Services/register';
import { NavLink, useNavigate } from 'react-router-dom';
import { schema } from '../Schema/RegisterSchema';






export default function Registerpage() {

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {handleSubmit , register ,formState} =useForm({
    defaultValues :{
        name: '',
        email:'',
        password:'',
        rePassword:'',
        dateOfBirth:'',
        gender:''
    }, 
    resolver:zodResolver(schema)
  })
  
  async function signUp(values){
      setLoading(true)
      const response = await sendRegisterDate(values);
      if(response.error){
        setApiError(response.error)
      }else{
        navigate('/login')
      }
      setLoading(false)
  }

  return <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-white py-10 px-6 shadow-2xl rounded-2xl'>
        <h2 className='text-2xl'>Registeration</h2>
        <form onSubmit={handleSubmit(signUp)}  className='mt-8 w-md flex flex-col gap-5'>
          <Input {...register("name")} isInvalid={Boolean(formState.errors.name?.message)} 
          errorMessage={formState.errors.name?.message} 
          variant='bordered' label="Name" labelPlacement='outside' placeholder="Example" type="text" />

          <Input {...register("email")} isInvalid={Boolean(formState.errors.email?.message)} 
          errorMessage={formState.errors.email?.message} variant='bordered' label="Email" labelPlacement='outside' placeholder="name@Example.com" type="email" />
          
          <Input {...register("password")} isInvalid={Boolean(formState.errors.password?.message)} errorMessage={formState.errors.password?.message} variant='bordered' label="password" labelPlacement='outside' placeholder="Example@123" type="password" />
          
          <Input {...register("rePassword")} isInvalid={Boolean(formState.errors.rePassword?.message)} errorMessage={formState.errors.rePassword?.message} variant='bordered' label="Repassword" labelPlacement='outside' placeholder="Example@123" type="password" />
          
          <div className="flex gap-4">
            <Input {...register("dateOfBirth")} isInvalid={Boolean(formState.errors.dateOfBirth?.message)} errorMessage={formState.errors.dateOfBirth?.message} variant='bordered' label="Date" labelPlacement='outside' placeholder="Example" type="date" />
          
            <Select {...register("gender")} isInvalid={Boolean(formState.errors.gender?.message)} errorMessage={formState.errors.gender?.message} variant='bordered' label="Gender" className='Pb-1' labelPlacement='outside-top'>
              <SelectItem key= 'male'>Male</SelectItem>
              <SelectItem key= 'female'>Female</SelectItem>
          </Select>
          </div>
          {apiError && <p className="text-red-500 text-center">{apiError}</p>}
          <Button isLoading={loading} type='submit' variant='solid' color="primary">Register</Button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <NavLink
              to="/login"
              className="ml-1 font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Sign in
            </NavLink>
          </p>
        </form>
      </div>
      
    </div>
}
