import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Main from '../components/main'
import SearchSection from '../components/search-section'
import { CountriesContext } from '../context/countries'

export default function Search() {
  const router = useRouter()
  const { countries } = useContext(CountriesContext)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!router.query.country) return false
    const country = countries.find(
      (country) =>
        country.name.common
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') ===
        router.query.country.trim().toLowerCase()
    )

    if (country) {
      router.push(`/${country.cca3}`)
      return false
    }

    const matches = countries.filter((country) =>
      country.name.common
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(router.query.country.trim().toLowerCase())
    )

    setResults(matches)
    setLoading(false)
  }, [countries, router.query.country])

  if (loading) return <h1 className="hidden">Countries API</h1>

  if (results <= 0) {
    return (
      <main role="main">
        <SearchSection />
        <div className="container mx-auto">
          <section className="py-16">
            <h1 className="text-5xl">
              No results or suggestions, please try again
            </h1>
          </section>
        </div>
      </main>
    )
  }

  return (
    <Main>
      <SearchSection />
      <div className="container mx-auto">
        <section className="py-16">
          <h1 className="text-5xl">
            Search results for {router.query.country}
          </h1>
        </section>
        <section>
          <p className="text-xl">
            Did you mean{' '}
            {results.map((country, index) => (
              <span key={country.cca3}>
                <Link href={`/${country.cca3}`}>
                  <a className="text-blue-500 underline">
                    {country.name.common}
                  </a>
                </Link>
                {index < results.length - 1 ? ', ' : '?'}
              </span>
            ))}
          </p>
        </section>
      </div>
    </Main>
  )
}
