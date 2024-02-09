import Image from 'next/image';
import { Container } from '@/components/Container';
import Link from 'next/link';

export type Country = {
  name: {
    common: string;
  };
  translations: {
    por: {
      name: {
        common: string;
      };
    };
  };
  flags: {
    svg: string;
    alt: string;
  };
  capital: string;
  reginon: string;
  subregion: string;
  population: number;
  languages?:{
    [key: string]: string
  }
};

async function getPaises(): Promise<Country[]> {
  const res = await fetch('https://restcountries.com/v3.1/all', {
    next: {
      revalidate: 60
    }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const countries = await getPaises();

  return (
    <Container>
      <section className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full container mt-16">
        {countries.map((country) => (
          <Link
            href={`/pais/${country.name.common}`}
            key={country.name.common}
          >
            <article
              className="h-64 min-w-full p-2 bg-white rounded-md hover:border-indigo-200 transition-all hover:shadow-2xl" 
            >
              <div className="relative w-full h-40 p-2 overflow-hidden rounded-md">
                <Image
                  className="object-cover"
                  src={country.flags.svg}
                  alt={country.flags.alt}
                  fill
                />
              </div>
              <h1 className="font-bold text-center text-md mt-2">
                {country.translations.por.common}
              </h1>
            </article>
          </Link>
        ))}
      </section>
    </Container>
  );
}
