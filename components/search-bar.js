import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import SearchAutocomplete from './search-autocomplete'

export default function SearchBar() {
  const router = useRouter()
  const [value, setValue] = useState('')
  const searchRef = useRef(null)
  const [formIsFocused, setFormIsFocused] = useState(false)

  useEffect(() => {
    if (!formIsFocused) return null
    const checkIfAutocompleteShouldBeHidden = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setFormIsFocused(false)
      }
    }

    document.addEventListener('click', checkIfAutocompleteShouldBeHidden)

    return () => {
      document.removeEventListener('click', checkIfAutocompleteShouldBeHidden)
    }
  }, [formIsFocused])

  const handleFocus = () => {
    setFormIsFocused(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.value === '') return false
    router.push(`/search?country=${value}`)
    setValue('')
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="relative mb-8 w-full md:mb-0 md:w-1/3" ref={searchRef}>
      <form onSubmit={(e) => handleSubmit(e)} className="w-full">
        <input
          type="search"
          onFocus={handleFocus}
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
      <SearchAutocomplete
        term={value}
        formIsFocused={formIsFocused}
        setFormIsFocused={setFormIsFocused}
      />
    </div>
  )
}
