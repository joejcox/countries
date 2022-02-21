import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const CountriesContext = createContext(null)

export default function CountriesContextProvider({ children }) {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const getData = async () => {
      const countries = JSON.parse(localStorage.getItem('countries'))
      if (countries) {
        setCountries(countries)
        return false
      }
      const response = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(response.data)
      localStorage.setItem('countries', JSON.stringify(response.data))
    }

    getData()
  }, [])

  const value = {
    countries,
  }

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  )
}
