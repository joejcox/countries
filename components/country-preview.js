import Image from 'next/image'
import Link from 'next/link'

export default function CountryPreview({ country }) {
  return (
    <article className="mb-4 w-full p-0 sm:w-1/2 sm:p-4 md:w-1/3 lg:p-8 xl:mb-12 xl:w-1/4">
      <div className="h-full overflow-hidden rounded-md border border-lm-light-grey bg-white shadow-lg dark:border-dm-dark-blue dark:bg-dm-blue">
        <Link href={`/${country.cca3}`}>
          <a>
            <figure className="relative aspect-[3/2] w-full">
              <Image
                src={country.flags.svg}
                alt={country.name.common}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={country.flags.png}
                className="cursor-pointer"
              />
            </figure>
          </a>
        </Link>
        <div className="bg-white px-5 py-6 text-dm-dark-blue dark:bg-dm-blue dark:text-lm-light-grey">
          <h2 className="mb-4 text-lg font-extrabold ">
            {<Link href={`/${country.cca3}`}>{country.name.common}</Link>}
          </h2>
          <p>
            <b>Population: </b>
            {country.population.toLocaleString()}
          </p>
          <p>
            <b>Region: </b>
            {country.region}
          </p>
          <p>
            <b>Capital: </b>
            {country.capital}
          </p>
        </div>
      </div>
    </article>
  )
}
