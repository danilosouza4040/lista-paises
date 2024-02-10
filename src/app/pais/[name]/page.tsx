import Link from 'next/link';
import Image from 'next/image';
import { Country } from '@/app/page';
import { Container } from '@/components/Container';
import CountryCard from '@/components/CountryCard/page';

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries: Country[] = await response.json();
  return countries.find((country: Country) => country.name.common === name);
}

async function getCountryBordersByName(name: string) {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries: Country[] = await response.json();

  const country = countries.find(
    (country: Country) => country.name.common === name
  );

  return country.borders?.map((border) => {
    const borderCountry = countries.find(
      (country: Country) => country.cca3 === border
    );
    return {
      name: borderCountry.name.common,
      ptName: borderCountry.translations.por.common,
      flag: borderCountry.flags.svg,
      flagAlt: borderCountry.flags.alt
    };
  });
}

export default async function CountryPage({
  params: { name }
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(name);
  const borderCountries = await getCountryBordersByName(decodeURI(name));
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <Container className="block">
      <section className="mt-16 mb-16">
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
          <div className="relative h-[250px] shadow-md mt-5 md:mt-0 rounded-xl">
            <Image
              className="w-full h-full object-cover rounded-xl"
              src={country.flags.svg}
              alt={country.flags.alt}
              fill
            />
          </div>
        </article>
        <section className="mt-12">
          <h3 className="mt-12 text-2xl font-semibold text-primary-gray">
            Países que fazem fronteira
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-6">
            {borderCountries?.map((border) => <CountryCard {...border} />)}
          </div>
        </section>
      </section>
    </Container>
  );
}
