import { useContext } from 'react'
import { CountriesContext } from '../context/countries'

export default function useCountries() {
  const { countries } = useContext(CountriesContext)

  const getAutoCompleteResultsFromTerm = (term) => {
    return countries.filter((data) =>
      data.name.common.trim().toLowerCase().includes(term.trim().toLowerCase())
    )
  }

  return { getAutoCompleteResultsFromTerm }
}
