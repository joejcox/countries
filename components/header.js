import ThemeToggle from './theme-toggle'

export default function Header() {
  const handleClick = () => {
    window.location.href = '/'
  }
  return (
    <header className="bg-white py-4 text-lm-blue shadow dark:bg-dm-blue dark:text-lm-light-grey">
      <div className="container mx-auto flex items-center justify-between">
        <button className="text-2xl font-extrabold" onClick={handleClick}>
          Where in the world?
        </button>
        <ThemeToggle />
      </div>
    </header>
  )
}
