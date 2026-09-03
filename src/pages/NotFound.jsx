import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="font-display text-6xl sm:text-7xl mb-4 text-accent">404</h1>
      <h2 className="text-xl sm:text-2xl font-bold mb-3">This page does not exist yet.</h2>
      <p className="text-muted text-sm sm:text-base mb-8 max-w-md">
        Either the link is wrong, or this is something still in progress that is not live yet.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 transition-opacity"
      >
        <Home size={16} /> Back to Home
      </Link>
    </div>
  )
}
