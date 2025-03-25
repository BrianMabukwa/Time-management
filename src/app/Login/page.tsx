"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();





  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      action: 'login'
    };

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const user = await response.json();
      if (!response.ok || !user.success) {
        throw new Error(user.message || 'Failed to authenticate');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('userId', user.user.userId);
      }

      console.log('User logged in:', user);
      router.push('/Tasks');

    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 py-12 min-h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto w-auto font-bold text-blue-900 text-2xl/9 text-center text-center tracking-tight">BookWorm</h1>
        <h2 className="mt-10 font-bold text-gray-900 text-2xl/9 text-center tracking-tight">Sign In</h2>
      </div>


      <div className="sm:mx-auto mt-10 sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-900 text-sm/6">Email address</label>
            <div className="mt-2">
              <input type="email" name="email" id="email" required className="block bg-white px-3 py-1.5 rounded-md outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 -outline-offset-1 focus:-outline-offset-2 w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 text-base" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">Password</label>
            </div>
            <div className="mt-2">
              <input type="password" name="password" id="password" required className="block bg-white px-3 py-1.5 rounded-md outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 -outline-offset-1 focus:-outline-offset-2 w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 text-base" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div>
            <button type="submit" className="flex justify-center bg-indigo-600 hover:bg-indigo-500 shadow-xs px-3 py-1.5 rounded-md focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 w-full font-semibold text-white text-sm/6" onClick={handleRegister}>Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-gray-500 text-sm/6 text-center">
          Don't have an account?
          <Link href="/">
            <span className="font-semibold text-indigo-600 hover:text-indigo-500"> Sign up</span>
          </Link>
        </p>
      </div>
    </div>

  );
}