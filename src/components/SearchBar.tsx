import type React from "react"
import { SearchIcon } from "../icons"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  handleSearch: (e: React.FormEvent) => void
}

export function SearchBar({ searchTerm, setSearchTerm, handleSearch }: SearchBarProps) {
  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}
