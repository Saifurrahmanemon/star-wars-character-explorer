"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Input } from "./ui/input"

interface SearchBarProps {
  initialSearch: string
}

export function SearchBar({ initialSearch }: SearchBarProps) {
  const [search, setSearch] = useState(initialSearch)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set("search", value)
      } else {
        params.delete("search")
      }
      params.delete("page") // Reset to first page on new search
      router.push(`/?${params.toString()}`)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(search)
  }

  const clearSearch = () => {
    setSearch("")
    handleSearch("")
  }

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search characters (e.g., Luke, Vader, Leia)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-20 py-3 text-lg bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
            disabled={isPending}
          />
          {search && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              disabled={isPending}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-600 hover:bg-yellow-700"
          disabled={isPending}
        >
          {isPending ? "..." : "Search"}
        </Button>
      </form>
    </div>
  )
}
