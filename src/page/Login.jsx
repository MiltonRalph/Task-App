import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiCheckCircle, BiCircle } from 'react-icons/bi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const passwordRequirements = [
    { regex: /.{8,}/, message: 'At least 8 characters' },
    { regex: /[0-9]/, message: 'At least 1 number (0...9)' },
    { regex: /[a-z]/, message: 'At least 1 lowercase letter (a...z)' },
    { regex: /[^A-Za-z0-9]/, message: 'At least 1 special symbol (!...$)' },
    { regex: /[A-Z]/, message: 'At least 1 uppercase letter' },
  ];

  const [showRequirements, setShowRequirements] = useState(false);

  // Handle password focus
  const handlePasswordFocus = () => setShowRequirements(true);
  const handlePasswordBlur = () => setShowRequirements(password.length > 0);

  // Handle email input change
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    setIsEmailValid(emailPattern.test(emailValue));
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    const validPassword = passwordRequirements.every(({ regex }) =>
      regex.test(passwordValue)
    );
    setIsPasswordValid(validPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      setLoading(true);
      setError('');

      // Backend registration logic using the models provided
      try {
        const response = await fetch(
          'http://localhost:8000/api/v1/users/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          window.sessionStorage.setItem(
            'task_App-token',
            JSON.stringify(data.token)
          );
          window.localStorage.setItem('loggedIn', true);

          // Notify success
          toast.success('✔️ Login successful!', {
            position: 'top-right',
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Login failed.');
        }
      } catch (error) {
        toast.error('❌ User does not exist!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please make sure all fields are valid.');
    }
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-gray-200'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
          <h2 className='text-2xl font-semibold mb-4 text-primaryColor'>
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className='mb-4 relative'>
              <input
                name='email'
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='Enter your email'
                required
                className='w-full px-4 py-2 border rounded-md focus:ring-1 focus:outline-none'
              />
              <FaEnvelope
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                  isEmailValid ? 'text-green-500' : 'text-red-500'
                }`}
              />
            </div>

            {/* Password Input */}
            <div className='mb-4 relative'>
              <input
                name='password'
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                placeholder='Create password'
                required
                className='w-full px-4 py-2 border rounded-md focus:ring-1 focus:outline-none'
              />
              {passwordVisible ? (
                <FaEyeSlash
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={() => setPasswordVisible(false)}
                />
              ) : (
                <FaEye
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={() => setPasswordVisible(true)}
                />
              )}
            </div>

            {/* Password Requirements List */}
            {showRequirements && (
              <div className='mb-4'>
                <ul>
                  <p className='text-xs'>Password must contain</p>
                  {passwordRequirements.map((item, index) => (
                    <li
                      key={index}
                      className={`flex items-center ${
                        item.regex.test(password)
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}>
                      {item.regex.test(password) ? (
                        <BiCheckCircle className='text-xs' />
                      ) : (
                        <BiCircle className='text-xs' />
                      )}
                      <span className='ml-2 text-xs'>{item.message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md ${
                isEmailValid && isPasswordValid
                  ? ''
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!(isEmailValid && isPasswordValid) || loading}>
              {loading ? 'Login In...' : 'Login'}
            </button>
            <div className='flex justify-between mt-4'>
              <p className='text-sm'>New User?</p>
              <Link
                to='/'
                className='text-sm text-linkColor hover:text-hoverColor'>
                Register Here
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <p className='text-red-500 mt-2 text-center text-sm'>{error}</p>
            )}
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
