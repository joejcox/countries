import axios from 'axios'
import cacheData from 'memory-cache'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CountriesList from '../components/countries-list'
import Filter from '../components/filter'
import SearchBar from '../components/search-bar'

export default function Home({ countries }) {
  const router = useRouter()

  return (
    <main role="main">
      <Head>
        <title>
          {router.query.region
            ? `${router.query.region} | Countries API`
            : 'Countries API'}
        </title>
        <meta name="description" content="Explore countries" />
      </Head>
      <section className="py-8">
        <div className="container mx-auto flex flex-col flex-wrap items-center justify-between md:flex-row">
          <SearchBar />
          <Filter />
        </div>
      </section>
      <CountriesList countries={countries} />
    </main>
  )
}

export async function getServerSideProps({ query }) {
  let url = query.region
    ? `https://restcountries.com/v3.1/region/${query.region}`
    : 'https://restcountries.com/v3.1/all'

  const response = await fetchWithCache(url)

  return {
    props: {
      countries: response.data,
    },
  }
}

export async function fetchWithCache(url) {
  const value = cacheData.get(url)
  if (value) {
    return value
  } else {
    const hours = 24
    const res = await axios.get(url)
    cacheData.put(url, res, hours * 1000 * 60 * 60)
    return res
  }
}
