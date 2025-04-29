"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const router = useRouter();



  const handleRegister = async () => {

    const newUser = {
      email: email, password: password, fname: fname, action: 'register'
    };

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error('Failed to save user');

      const user = await response.json();
      console.log(user);

      if (typeof window != "undefined") {
        localStorage.setItem('user', user.userId);
        console.log('User:', user.userId);
        // router.push('/Login');
        window.location.href = '/Login';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 py-12 min-h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto w-auto font-bold text-blue-900 text-2xl/9 text-center text-center tracking-tight">BookWorm</h1>
        <h2 className="mt-4 font-bold text-gray-900 text-2xl/9 text-center tracking-tight">Sign up</h2>
      </div>


      <div className="sm:mx-auto mt-5 sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-900 text-sm/6">Email address</label>
            <div className="mt-2">
              <input type="email" name="email" id="email" required className="block bg-white px-3 py-1.5 rounded-md outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 -outline-offset-1 focus:-outline-offset-2 w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 text-base" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-900 text-sm/6">Full Name</label>
            <div className="mt-2">
              <input type="text" name="fname" id="fname" required className="block bg-white px-3 py-1.5 rounded-md outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 -outline-offset-1 focus:-outline-offset-2 w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 text-base" onChange={(e) => setFname(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">Password</label>
            <div className="mt-2">
              <input type="password" name="password" id="password" required className="block bg-white px-3 py-1.5 rounded-md outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 -outline-offset-1 focus:-outline-offset-2 w-full text-gray-900 placeholder:text-gray-400 sm:text-sm/6 text-base" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div>
            <button type="submit" className="flex justify-center bg-indigo-600 hover:bg-indigo-500 shadow-xs px-3 py-1.5 rounded-md focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 w-full font-semibold text-white text-sm/6" onClick={handleRegister}>Sign up</button>
          </div>
        </form>

        <p className="mt-10 text-gray-500 text-sm/6 text-center">
          Already have an account?{' '}
          <Link href="/Login">
            <span className="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</span>
          </Link>
        </p>
      </div>
    </div>

  );
}
