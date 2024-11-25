import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const logOut = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      window.localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <>
      <nav className='nav flex items-center justify-between sticky top-0 z-50 mx-auto max-w-8xl px-4 md:px-6 lg:px-8 xl:px-12 py-3 bg-bgColor'>
        {/* Logo */}
        <Link to='/' className='flex self-center items-center justify-center'>
          <img
            src={logo}
            alt='logo.png'
            loading='lazy'
            className='logo w-14 h-14'
          />
          <h3 className='font-semibold text-primaryColor'>
            Task<span className='font-bold'>Me</span>
          </h3>
        </Link>
        <Link
          to='/login'
          onClick={logOut}
          className='bg-primaryColor text-white px-4 py-2 rounded hover:bg-linkColor transition'>
          Log Out
        </Link>
        {/* Notification Bell*/}
        <div className='top-0 lg:my-0 right-0 flex items-center static inset-auto lg:ml-6 lg:pr-0'>
          {/* Bell Notification */}
          <button
            type='button'
            className='rounded-full bg-fontColor p-1 mt-1 mr-1 ml-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 md:mr-3 lg:mt-0 lg:mr-0'>
            <span className='sr-only'>View notifications</span>
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'>
              <path d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
