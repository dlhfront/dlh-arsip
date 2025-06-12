'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export default function SearchInput({ documentType }) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      if (query) params.set('query', query)
      else params.delete('query')
      router.replace(`?${params.toString()}`)
    }, 500)

    return () => clearTimeout(timer)
  }, [query, router])

  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={`Search ${documentType}...`}
        className="pl-10 pr-4 py-2 border rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}