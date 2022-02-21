import CountryPreview from './country-preview'

export default function CountriesList({ countries }) {
  return (
    <section className="py-8">
      <div
        className="container mx-auto flex flex-wrap items-stretch"
        id="countries"
      >
        {countries
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country) => (
            <CountryPreview country={country} key={country.name.common} />
          ))}
      </div>
    </section>
  )
}
