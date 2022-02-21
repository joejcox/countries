import Image from 'next/image'
import Link from 'next/link'

export default function CountryDetails({ country }) {
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
    <div className="flex w-full flex-col justify-center p-8 leading-[2] lg:w-1/2 lg:py-0 lg:pl-16">
      <h1 className="mb-8 text-3xl font-extrabold">{country.name.common}</h1>
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
  )
}
