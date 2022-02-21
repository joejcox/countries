import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchWithCache } from '.'

export default function Country({ country, error }) {
  const router = useRouter()
  if (error || !country) {
    return (
      <section className="py-16">
        <Head>
          <title>Invalid Country | Countries API</title>
        </Head>
        <div className="container mx-auto">
          <h1 className="text-5xl text-lm-blue dark:text-lm-light-grey">
            Invalid Country
          </h1>
        </div>
      </section>
    )
  }

  const languages = [...Object.keys(country.languages)]
  const currencies = country.currencies && [...Object.keys(country.currencies)]

  const CurrenciesList = () => (
    <p className="w-1/2">
      <b>Currencies: </b>
      {currencies.map((currency, index) => {
        if (index === currencies.length - 1) {
          return country.currencies[currency].name
        }

        return `${country.currencies[currency].name}, `
      })}
    </p>
  )

  const Languages = () => (
    <p className="w-1/2">
      <b>Languages: </b>
      {languages.map((language, index) => {
        if (index === languages.length - 1) {
          return country.languages[language]
        }

        return `${country.languages[language]}, `
      })}
    </p>
  )

  return (
    <main role="main">
      <Head>
        <title>{country.name.common} | Countries API</title>
      </Head>
      <section className="py-16">
        <div className="container mx-auto">
          <button
            className="mb-2 inline-flex rounded border bg-lm-light-grey px-6 py-2 text-sm shadow-md hover:border-gray-100 hover:bg-white hover:shadow-lg dark:border-dm-dark-blue dark:bg-dm-blue dark:text-lm-light-grey dark:hover:bg-slate-600"
            onClick={() => router.back()}
          >
            <ArrowNarrowLeftIcon className="mr-4 h-5 w-5" /> Back
          </button>
        </div>
      </section>
      <section>
        <div className="container mx-auto flex flex-wrap items-stretch">
          <div className="aspect-[3/2] w-full border shadow-lg dark:border-dm-dark-blue lg:w-1/2">
            <figure className="relative h-full w-full">
              <Image
                src={country.flags.svg}
                alt={country.name.common}
                layout="fill"
                objectFit="cover"
                priority
              />
            </figure>
          </div>
          <div className="flex w-full flex-col justify-center p-8 leading-[2] lg:w-1/2 lg:py-0 lg:pl-16">
            <h1 className="mb-8 text-3xl font-extrabold">
              {country.name.common}
            </h1>
            <div className="flex w-full flex-wrap">
              <p className="w-1/2">
                <b>Native Name: </b>
                {country.name.nativeName[languages[0]].common}
              </p>
              <p className="w-1/2">
                <b>Top Level Domain: </b>
                {country.tld}
              </p>
              <p className="w-1/2">
                <b>Population: </b>
                {country.population.toLocaleString()}
              </p>
              {currencies && <CurrenciesList />}
              <p className="w-1/2">
                <b>Region: </b>
                {country.region}
              </p>
              <Languages />
              <p className="w-1/2">
                <b>Sub Region: </b>
                {country.subregion}
              </p>
            </div>
            <p className="w-1/2">
              <b>Capital: </b>
              {country.capital}
            </p>
            {country.borders && (
              <div className="mt-10">
                <b className="mb-2 block">Border Countries: </b>{' '}
                {country.borders.map((code, index) => {
                  let margin = 'mr-2'
                  if (index === country.borders.length - 1) {
                    margin = 'mr-0'
                  }
                  return (
                    <Link href={`/${code}`} key={code}>
                      <a
                        className={`mb-2 inline-block rounded border border-gray-200 bg-lm-light-grey px-10 py-2 text-sm shadow-sm hover:border-gray-100 hover:bg-white hover:shadow-md dark:bg-dm-blue dark:text-lm-light-grey dark:hover:bg-slate-600 ${margin}`}
                      >
                        {code}
                      </a>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export async function getServerSideProps({ params }) {
  const country = params.country
  try {
    const url = `https://restcountries.com/v3.1/alpha/${country}`
    const response = await fetchWithCache(url)

    return {
      props: {
        country: response.data[0],
      },
    }
  } catch (error) {
    return {
      props: {
        error: true,
      },
    }
  }
}
