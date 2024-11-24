'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from './lib/data';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    console.log({email, password})
    const response = await signIn(email, password)
    if(response)
      router.push('/dashboard');
  };

  return (
    <div className="h-screen bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-2 rounded-md bg-transparent border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white placeholder-opacity-50"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-white text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-2 rounded-md bg-transparent border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white placeholder-opacity-50"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
