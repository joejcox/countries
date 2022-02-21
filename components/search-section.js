import Filter from './filter'
import SearchBar from './search-bar'

export default function SearchSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-between md:flex-row ">
        <SearchBar />
        <Filter />
      </div>
    </section>
  )
}
