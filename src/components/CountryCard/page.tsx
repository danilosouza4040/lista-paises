import Link from "next/link";
import Image from "next/image";

export default function CountryCard({
  name,
  ptName,
  flag,
  flagAlt
}: {
  name:string,
  ptName:string,
  flag:string,
  flagAlt:string,
}) {
  return (
    <Link href={`/pais/${name}`} key={name}>
      <article className="h-64 min-w-full p-2 bg-white rounded-md hover:border-indigo-200 transition-all hover:shadow-2xl">
        <div className="relative w-full h-40 p-2 overflow-hidden rounded-md">
          <Image
            className="object-cover"
            src={flag}
            alt={flagAlt}
            fill
          />
        </div>
        <h1 className="font-bold text-center text-md mt-2">
          {ptName}
        </h1>
      </article>
    </Link>
  );
}
