import { useRouter } from 'next/router';

function Tweet() {
  const router = useRouter();
  return (
    <main className='flex flex-col space-y-8'>
      <span>{router?.query?.tweet}</span>
    </main>
  );
}

export default Tweet;
