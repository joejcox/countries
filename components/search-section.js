import Filter from './filter'
import SearchBar from './search-bar'

export default function SearchSection() {
  return (
    <section className="pt-16 pb-8">
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-between md:flex-row ">
        <SearchBar />
        <Filter />
      </div>
    </section>
  )
}
