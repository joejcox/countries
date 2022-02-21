import { useRouter } from 'next/router'
import { useState } from 'react'
import SearchAutocomplete from './search-autocomplete'

export default function SearchBar() {
  const router = useRouter()
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/search?country=${value}`)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="relative mb-8 w-full md:mb-0 md:w-1/3">
      <form onSubmit={(e) => handleSubmit(e)} className="w-full">
        <input
          type="search"
          placeholder={
            router.query.region
              ? `Search for a country in ${router.query.region}...`
              : 'Search for a country...'
          }
          className="w-full rounded border border-lm-light-grey bg-white px-4 py-3 shadow outline-white dark:border-dm-dark-blue dark:bg-dm-blue dark:outline-none"
          onChange={handleChange}
          value={value}
        />
      </form>
      <SearchAutocomplete term={value} />
    </div>
  )
}
