import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const dm = JSON.parse(localStorage.getItem('theme'))
    if (!dm) return null

    document.body.classList.add('dark')
    setDarkMode(true)
  }, [])

  const toggleTheme = () => {
    document.body.classList.toggle('dark')
    localStorage.setItem('theme', JSON.stringify(!darkMode))
    setDarkMode(!darkMode)
  }

  return (
    <button
      onClick={() => toggleTheme()}
      className="ml-auto flex items-center font-bold text-lm-blue dark:text-lm-light-grey"
    >
      {darkMode ? (
        <>
          <SunIcon className="mr-2 mb-0.5 h-5 w-5" /> Light Mode
        </>
      ) : (
        <>
          <MoonIcon className="mr-2 mb-0.5 h-5 w-5" /> Dark Mode
        </>
      )}
    </button>
  )
}
