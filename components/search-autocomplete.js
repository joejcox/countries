import { useRouter } from 'next/router'
import { useContext } from 'react'
import { CountriesContext } from '../context/countries'

export default function SearchAutocomplete({ term, setFormIsFocused }) {
  const router = useRouter()
  term = term.trim().toLowerCase()
  const ctx = useContext(CountriesContext)

  const countries = router.query.region
    ? ctx.countries.filter((c) => c.region === router.query.region)
    : ctx.countries

  const handleClick = (route) => {
    const hyphenate = route.replace(' ', '-')
    setFormIsFocused(false)
    window.location.href = hyphenate
  }

  return (
    <div className="absolute top-full left-0 z-50 max-h-[400px] w-full translate-y-2 overflow-y-scroll rounded-lg border border-lm-light-grey bg-white shadow dark:border-dm-dark-blue dark:bg-dm-blue">
      {countries.map((country) => {
        if (!term) return false

        if (
          country.name.common
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(term)
        ) {
          return (
            <div
              className="cursor-pointer py-3 px-4 font-light hover:bg-lm-light-grey dark:hover:bg-dm-blue"
              key={country.cca3}
            >
              <button
                onClick={() => handleClick(`/${country.cca3}`)}
                className="flex w-full items-center justify-between"
              >
                {country.name.common}{' '}
                <span className="text-xs text-gray-400">{country.region}</span>
              </button>
            </div>
          )
        }
      })}
    </div>
  )
}
