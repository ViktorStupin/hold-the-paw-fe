import { Outlet } from 'react-router-dom';

export const AuthPage = () => {
  return (
    <div className='bg-nature lg:grid-cols-2 lg:grid'>
      <Outlet />

      <div className='hidden lg:block sticky top-0 h-dvh'>
        <img
          src='src\assets\photos\close-up-of-a-white-cat-with-blue-eyes 1.webp'
          alt='auth-photo'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};
