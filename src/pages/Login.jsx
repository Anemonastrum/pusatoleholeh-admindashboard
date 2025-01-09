import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempt with:', { email, password, rememberMe });
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center">
            <img src="/images/Hydro.svg" alt="logo" className="h-28 w-28 mx-auto" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:border-violet-500 focus:ring-violet-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:border-violet-500 focus:ring-violet-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-700/60 text-violet-500 focus:ring-violet-500 dark:bg-gray-800"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-violet-500 hover:text-violet-600">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-150"
            >
              Sign in
            </button>
          </form>

          {/* Footer */}
          <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Protected by reCAPTCHA and subject to the{' '}
              <a href="#" className="text-violet-500 hover:text-violet-600">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="#" className="text-violet-500 hover:text-violet-600">
                Terms of Service
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

export default Login;
