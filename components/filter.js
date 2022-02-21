import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { CountriesContext } from '../context/countries'

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
      {menuIsOpen && (
        <div className="absolute left-0 top-full z-50 flex w-full flex-col items-stretch rounded-b-lg border-gray-300 bg-white shadow dark:border-dm-dark-blue dark:bg-dm-blue">
          <button
            className="p-4 text-left font-bold hover:bg-gray-200 dark:hover:bg-dm-dark-blue"
            onClick={() => handleClick('all')}
          >
            Show All
          </button>
          {regions.map((r) => (
            <button
              className="p-4 text-left font-bold hover:bg-gray-200 dark:hover:bg-dm-dark-blue"
              onClick={() => handleClick(r)}
              key={r}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
