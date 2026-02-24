import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-amber-50 p-8">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-semibold text-stone-800 mb-4">
          Your Parenting Blueprint
        </h1>
        <p className="text-lg text-stone-600 mb-8">
          Discover your parenting archetype — grounded in research, written just for you.
        </p>
        <Link
          href="/quiz"
          className="inline-block rounded-full bg-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-amber-600 transition-colors"
        >
          Take the Quiz
        </Link>
      </div>
    </main>
  )
}
