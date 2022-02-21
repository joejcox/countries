import Image from 'next/image'

export default function CountryImage({ country }) {
  return (
    <div className="aspect-[3/2] w-full border shadow-lg dark:border-dm-dark-blue lg:w-1/2">
      <figure className="relative h-full w-full">
        <Image
          src={country.flags.svg}
          alt={country.name.common}
          layout="fill"
          objectFit="cover"
          priority
        />
      </figure>
    </div>
  )
}
