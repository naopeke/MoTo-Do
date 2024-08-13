'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import z from "zod";


export default function LoginForm() {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const FormSchema = z.object({
        email: z.string().email ({ message: 'Invalid email address'}),
        password: z.string().min(6, {message: 'Password must be at least 6 characters'})
    });
        
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const validation = FormSchema.safeParse({ email, password });
      if (!validation.success) {
        setError(validation.error.errors.map(err => err.message).join(', '));
        return;
      }
      setError(null); 
  
      const response:any = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!response.ok){
        setError('Network response was not ok');
      } else {
        console.log('Login successful', response);
        router.push('/');
      }

      signIn('credentials',{
        email: formData.get('email'),
        password:formData.get('password'),
        redirect:false
      })
  
    };


  return (
    <form 
        className="space-y-3"
        onSubmit={handleSubmit}    
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <button type="submit" className="mt-4 w-full aria-disabled={pending}">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </button>
      </div>
    </form>
  );
}