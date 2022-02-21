import CountryPreview from './country-preview'

export default function CountriesList({ countries }) {
  return (
    <section className="py-8">
      <div className="container mx-auto flex flex-wrap items-stretch">
        {countries.map((country) => (
          <CountryPreview country={country} key={country.name.common} />
        ))}
      </div>
    </section>
  )
}
