import useMutation from 'libs/client/useMutation';
import { useRouter } from 'next/router';
import { User } from 'prisma/prisma-client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { cls, EMAIL_VALIDATION_CHECK } from '../libs/client/util';

interface FormProps {
  email: string;
}

interface IUserResponse {
  ok: boolean;
  user: User;
}

function Home() {
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProps>({ mode: 'onChange' });
  const [signUp, { loading, data }] =
    useMutation<IUserResponse>('/api/sign-in');

  const onValid = () => {
    if (loading) return;
    const { email } = getValues();
    signUp({ email });
    reset();
  };
  useEffect(() => {
    if (data?.ok)
      setTimeout(() => {
        router.push('/');
      }, 500);
  }, [data, router]);
  return (
    <main className='flex flex-col space-y-8'>
      <h2 className='text-3xl font-semibold'>Sign In</h2>
      <form
        className='flex flex-col space-y-5'
        onSubmit={handleSubmit(onValid)}
      >
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
        <button
          className={cls(
            'border-2 p-3 rounded-sm transition-color duration-200 shadow-[0_10px_80px_-10px_#8575754a]',
            errors.email
              ? 'cursor-not-allowed bg-slate-900 border-none text-slate-600'
              : 'hover:bg-amber-900 active:border-amber-600 active:font-medium active:text-amber-200'
          )}
          onClick={handleSubmit(onValid)}
        >
          Sign In
        </button>
      </form>
    </main>
  );
}

export default Home;
