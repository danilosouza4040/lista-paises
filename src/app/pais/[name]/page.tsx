import { Country } from '@/app/page';
import { Container } from '@/components/Container';
import Link from 'next/link';
import Image from 'next/image';

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  return (await response.json())[0];
}

export default async function CountryPage({
    params: { name }
  }: {
    params: { name: string };
  }) {

  const country = await getCountryByName(name);
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <Container className="block">
      <section className="mt-16">
        <h1 className="text-5xl font-bold text-gray-800 text-center">
          {country.translations.por.common}
        </h1>
        <Link href="/">Voltar</Link>
        <article className="grid grid-cols-1 md:grid-cols-2 md:items-center justify-between h-auto min-h-[260px] min-w-full p-10 mt-4 bg-white rounded-md">
          <section className="grid gap-6">
            {country.capital && (
            <h2 className="text-md text-gray-800">
              Capital: {country.capital}
            </h2>
            )}
            <h2 className="text-md text-gray-800">
              Continente: {country.region} - {country.subregion}
            </h2>  
            <h2 className="text-md text-gray-800">
              Populção: {formatter.format(country.population)}
            </h2>
            {country.languages && (
            <h2 className="text-md text-gray-800">
              Línguas Falada:
              {Object.values(country.languages).map((lang) => (
                <span
                  key={lang}
                  className="inline-block ml-2 p-1 text-white bg-primary-orange rounded-xl"
                >
                  {lang}
                </span>
              ))}
            </h2>
            )}
          </section>
          <div className='relative h-[250px] shadow-md mt-5 md:mt-0 rounded-xl'>
            <Image
              className="w-full h-full object-cover rounded-xl"
              src={country.flags.svg}
              alt={country.flags.alt}
              fill
            />
          </div>
        </article>
      </section>
    </Container>
  );
}
