export default function FilterRegions({ regions, handleClick }) {
  return regions.map((r) => (
    <button
      className="p-4 text-left font-bold hover:bg-gray-200 dark:hover:bg-dm-dark-blue"
      onClick={() => handleClick(r)}
      key={r}
    >
      {r}
    </button>
  ))
}
