import React from 'react';
import { useForm } from 'react-hook-form';
import { cls, EMAIL_VALIDATION_CHECK } from '../libs/client/util';

interface FormProps {
  name: string;
  email: string;
  password: string;
}

function Home() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProps>({ mode: 'onChange' });

  const onValid = () => {
    console.log(getValues());
    reset();
  };
  return (
    <main className='flex flex-col space-y-8'>
      <h2 className='text-3xl font-semibold'>Create Account</h2>
      <form
        className='flex flex-col space-y-5'
        onSubmit={handleSubmit(onValid)}
      >
        <div className='flex flex-col space-y-1'>
          <label className='font-medium uppercase' htmlFor='name'>
            name
          </label>
          <input
            className='text-amber-700 focus:ring-2 ring-amber-900 outline-none p-2 rounded-sm shadow-[0_30px_40px_-17px_#9999994c]'
            {...register('name', { required: 'Please write down your name' })}
            id='name'
            type='text'
          />
          {errors.name?.message && (
            <span className='text-amber-600'>{errors.name.message}</span>
          )}
        </div>
        <div className='flex flex-col space-y-1'>
          <label className='font-medium uppercase' htmlFor='email'>
            email
          </label>
          <input
            className='text-amber-700 focus:ring-2 ring-amber-900 outline-none p-2 rounded-sm shadow-[0_30px_40px_-17px_#9999994c]'
            {...register('email', {
              required: 'Please write down your email',
              pattern: {
                value: EMAIL_VALIDATION_CHECK,
                message: 'Please enter a valid email.',
              },
            })}
            id='email'
            type='email'
          />
          {errors.email?.message && (
            <span className='text-amber-600'>{errors.email.message}</span>
          )}
        </div>
        <div className='flex flex-col space-y-1'>
          <label className='font-medium uppercase' htmlFor='password'>
            password
          </label>
          <input
            className='text-amber-700 focus:ring-2 ring-amber-900 outline-none p-2 rounded-sm shadow-[0_30px_40px_-17px_#9999994c]'
            {...register('password', {
              required: 'Please write down your password',
              minLength: {
                value: 4,
                message: 'Password must be at least 4',
              },
            })}
            id='password'
            type='password'
          />
          {errors.password?.message && (
            <span className='text-amber-600'>{errors.password.message}</span>
          )}
        </div>
        <button
          className={cls(
            'border-2 p-3 rounded-sm transition-color duration-200 shadow-[0_10px_80px_-10px_#8575754a]',
            errors.email || errors.name || errors.password
              ? 'cursor-not-allowed bg-slate-900 border-none text-slate-600'
              : 'hover:bg-amber-900'
          )}
          onClick={handleSubmit(onValid)}
        >
          Sign up
        </button>
      </form>
    </main>
  );
}

export default Home;
