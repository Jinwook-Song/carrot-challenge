import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IBillions {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

const Home: NextPage = () => {
  const [people, setPeople] = useState<IBillions[]>([]);
  const router = useRouter();
  useEffect(() => {
    fetch('https://billions-api.nomadcoders.workers.dev')
      .then((response) => response.json())
      .then((data) => setPeople(data as IBillions[]));
  }, []);

  const onClick = (id: string) => {
    router.push(`/person//${id}`);
  };

  return (
    <main className='container'>
      {people?.map((person) => (
        <div
          onClick={() => onClick(person.id)}
          className='person transition-all'
          key={person.name}
        >
          <img src={person.squareImage} alt={person.name} />
          <div className='details'>
            <Link href={`/person/${person.id}`}>
              <h2>
                {person.name}
                <a></a>
              </h2>
            </Link>
            <span className='fontse'>
              {Math.floor(person.netWorth / 1000)} Billion / {person.industries}
            </span>
          </div>
        </div>
      ))}
      <style jsx>{`
        .container {
          width: 100vw;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 20px;
          gap: 20px;
          margin: auto;
        }
        .person {
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
        }
        .person:hover {
          transform: scale(1.05) translateY(-10px);
        }
        .details {
          background-color: #34495e;
          padding: 2px 5px;
          text-overflow: clip;
          white-space: nowrap;
        }
        .details h2 {
          color: #fff;
          font-weight: bold;
        }
        .details span {
          font-weight: 600;
          font-size: 12px;
        }
      `}</style>
    </main>
  );
};

export default Home;
