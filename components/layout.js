import CountriesContextProvider from '../context/countries'
import Header from './header'

export default function Layout({ children }) {
  return (
    <CountriesContextProvider>
      <Header />
      {children}
    </CountriesContextProvider>
  )
}
