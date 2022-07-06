import useUser from 'libs/client/useUser';

function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <main className='flex flex-col space-y-8'></main>;
  }

  return (
    <main className='flex flex-col space-y-8'>
      <section className='flex flex-col space-y-4'>
        <h2 className='font-bold text-2xl'>Welcome {user?.name}</h2>
        <span>User Email: {user?.email}</span>
      </section>
    </main>
  );
}

export default Home;
