import useMutation from 'libs/client/useMutation';
import useUser from 'libs/client/useUser';
import { useRouter } from 'next/router';
import { Tweet } from 'prisma/prisma-client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

interface ITweetsResponse {
  ok: boolean;
  tweets: Tweet[];
}

function Tweets() {
  const router = useRouter();
  const { isLoading } = useUser();
  const { data, mutate } = useSWR<ITweetsResponse>('/api/tweet');

  const { register, getValues, reset, handleSubmit } = useForm<{
    tweet: string;
  }>();

  const [uploadTweet, { loading }] = useMutation('/api/tweet/upload');
  const onValid = () => {
    const tweet = getValues('tweet');
    if (loading) return;
    uploadTweet({ tweet });
    reset();
  };

  useEffect(() => {
    if (loading === false) mutate();
  }, [loading, mutate]);

  const handleTweetClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id, innerText: tweet } = event.currentTarget;
    router.push(
      {
        pathname: `/tweets/${id}`,
        query: {
          tweet,
        },
      },
      `/tweets/${id}`
    );
  };

  if (isLoading) {
    return <main className='flex flex-col space-y-8'></main>;
  }

  return (
    <main className='flex flex-col space-y-8 text-slate-300'>
      <section className='flex flex-col space-y-4'>
        <h2 className='text-4xl font-semibold py-4'>Tweets</h2>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            className='p-3 rounded-l-lg outline-none bg-slate-400 text-blue-600 placeholder:text-blue-100'
            {...register('tweet')}
            placeholder='new tweet...'
          />
          <button className='px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-r-lg font-medium'>
            Tweet
          </button>
        </form>
        {data?.tweets?.map((tweet) => (
          <span
            onClick={handleTweetClick}
            id={String(tweet.id)}
            key={tweet.id}
            className='cursor-pointer hover:text-blue-300 active:scale-y-110'
          >
            {tweet.tweet}
          </span>
        ))}
      </section>
    </main>
  );
}

export default Tweets;
