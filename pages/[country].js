import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchWithCache } from '.'
import BackButton from '../components/back'
import CountryDetails from '../components/country-details'
import CountryImage from '../components/country-image'
import Main from '../components/main'

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

  return (
    <Main>
      <Head>
        <title>{country.name.common} | Countries API</title>
      </Head>
      <BackButton />

      <section>
        <div className="container mx-auto flex flex-wrap items-stretch">
          <CountryImage country={country} />
          <CountryDetails country={country} />
        </div>
      </section>
    </Main>
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
