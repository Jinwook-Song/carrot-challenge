import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IFinancialAssets {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number;
}

interface IBillionDetails {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
  country: string;
  bio: string[];
  financialAssets: IFinancialAssets[];
}

const Detail: NextPage = () => {
  const {
    query: { id: personName },
  } = useRouter();

  const [person, setPerson] = useState<IBillionDetails>();

  console.log(person);

  useEffect(() => {
    fetch(`https://billions-api.nomadcoders.workers.dev/person/${personName}`)
      .then((response) => response.json())
      .then((data) => setPerson(data as IBillionDetails));
  }, [personName]);

  if (person) {
    return (
      <main className='container flex flex-col'>
        <section className='details flex flex-col'>
          <img src={person.squareImage} alt={person.name} />
          <h3>{person.name}</h3>
          <span>Networth: {Math.floor(person.netWorth / 1000)} Billion</span>
          <span>Country: {person.country}</span>
          <span>Industry: {person.industries[0]}</span>
          <p>
            {person.bio.map((text, idx) => (
              <span key={idx}>{text} </span>
            ))}
          </p>
        </section>
        <section className='financialAssets'>
          <h3>Finantial Assets</h3>
          <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2'>
            {person.financialAssets.map((asset, idx) => (
              <li
                key={idx}
                className='flex flex-col border rounded-md p-2 text-sm'
              >
                <span>Ticker: {asset.ticker}</span>
                <span>Shares: {asset.numberOfShares.toLocaleString()}</span>
                {asset.exerciseOptionPrice && (
                  <span>
                    Exercise Price: $
                    {asset.exerciseOptionPrice.toLocaleString()}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
        <style jsx>{`
          .container {
            width: 100vw;
            padding: 80px 40px;
            gap: 20px;
            margin: auto;
          }
          section {
            padding: 20px;
            background-color: #7f8c8d;
            border-radius: 10px;
          }
          section img {
            border-radius: 10px;
          }
          section > span {
            font-weight: 500;
          }
          section p {
            margin-top: 10px;
          }
          h3 {
            font-size: 1.5em;
            fontweight: bold;
            color: #f3f3f3;
          }
        `}</style>
      </main>
    );
  } else {
    return <main>loading...</main>;
  }
};

export default Detail;
