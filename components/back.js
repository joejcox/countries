import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

export default function BackButton() {
  const router = useRouter()

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <button
          className="mb-2 inline-flex rounded border bg-lm-light-grey px-6 py-2 text-sm shadow-md hover:border-gray-100 hover:bg-white hover:shadow-lg dark:border-dm-dark-blue dark:bg-dm-blue dark:text-lm-light-grey dark:hover:bg-slate-600"
          onClick={() => router.back()}
        >
          <ArrowNarrowLeftIcon className="mr-4 h-5 w-5" /> Back
        </button>
      </div>
    </section>
  )
}
