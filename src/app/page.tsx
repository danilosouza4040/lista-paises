import { Container } from '@/components/Container';
import CountryCard from '@/components/CountryCard/page';

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
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  cca3?: string;
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
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            ptName={country.translations.por.common}
            flag={country.flags.svg}
            flagAlt={country.flags.alt}
          />
        ))}
      </section>
    </Container>
  );
}
