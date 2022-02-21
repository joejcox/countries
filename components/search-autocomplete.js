import { useRouter } from 'next/router'
import { useContext } from 'react'
import { CountriesContext } from '../context/countries'

export default function SearchAutocomplete({
  term,
  setFormIsFocused,
  formIsFocused,
}) {
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
    <div
      className={`${
        term && formIsFocused
          ? 'opacity-1 pointer-events-auto translate-y-1.5 transition-all duration-100'
          : 'pointer-events-none translate-y-6 opacity-0'
      } absolute top-full left-0 z-50 h-auto max-h-[385px] w-full overflow-hidden rounded-lg border border-lm-light-grey bg-white shadow-md dark:border-dm-dark-blue dark:bg-dm-blue`}
    >
      {countries.map((country) => {
        if (
          country.name.common
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(term)
        ) {
          return (
            <div className="cursor-pointer font-light" key={country.cca3}>
              <button
                onClick={() => handleClick(`/${country.cca3}`)}
                className="flex w-full items-center justify-between py-3 px-4 hover:bg-gray-100 dark:hover:bg-dm-dark-blue"
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
