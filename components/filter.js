import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { CountriesContext } from '../context/countries'
import FilterRegions from './filter-regions'
import { ChevronDownIcon } from '@heroicons/react/outline'

export default function Filter() {
  const { countries } = useContext(CountriesContext)
  const router = useRouter()
  const [region, setRegion] = useState('all')
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [regions, setRegions] = useState([])

  useEffect(() => {
    if (router.pathname !== '/') return false
    const r = []
    countries.forEach((country) => {
      if (r.includes(country.region)) return false
      r.push(country.region)
    })

    setRegions(r)

    if (region === 'all') {
      router.push('/')
      return false
    }

    router.push(`/?region=${region}`)
  }, [region, countries])

  const handleMouseEnter = () => {
    setMenuIsOpen(true)
  }

  const handleMouseLeave = () => {
    setMenuIsOpen(false)
  }

  const handleClick = (str) => {
    setRegion(str)
    setMenuIsOpen(false)
  }

  if (router.pathname !== '/') return null

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative mr-auto w-60 cursor-pointer rounded border border-lm-light-grey bg-white px-4 py-3 capitalize shadow dark:border-dm-dark-blue  dark:bg-dm-blue md:mr-0"
    >
      {region === 'all' ? 'Filter by Region' : region}
      <div
        className={`absolute left-0 top-full z-50 w-full transition-all duration-100  ${
          menuIsOpen
            ? 'opacity-1 pointer-events-auto translate-y-0'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <div className="mt-2 flex w-full flex-col items-stretch rounded-lg border-gray-300 bg-white shadow dark:border-dm-dark-blue dark:bg-dm-blue">
          <button
            className="p-4 text-left font-bold hover:bg-gray-100 dark:hover:bg-dm-dark-blue"
            onClick={() => handleClick('all')}
          >
            Show All
          </button>
          <FilterRegions regions={regions} handleClick={handleClick} />
        </div>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-75 ${
            menuIsOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
    </div>
  )
}
