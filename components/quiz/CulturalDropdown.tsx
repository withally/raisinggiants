'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface DropdownOption {
  id: string
  label: string
}

interface CulturalDropdownProps {
  options: DropdownOption[]
  value: string | null
  onSelect: (value: string) => void
}

export function CulturalDropdown({ options, value, onSelect }: CulturalDropdownProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialise the text input with the selected option label if value is set
  const selectedOption = options.find((opt) => opt.id === value)

  // Filter options by query (case-insensitive)
  const filteredOptions =
    query.trim() === ''
      ? options
      : options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase()))

  function handleSelect(option: DropdownOption) {
    onSelect(option.id)
    setQuery(option.label)
    setIsOpen(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setIsOpen(true)
  }

  function handleInputFocus() {
    setIsOpen(true)
    // Clear query when re-focusing to allow fresh search
    if (selectedOption && query === selectedOption.label) {
      setQuery('')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        // Restore selected label if user blurs without selecting
        if (selectedOption) {
          setQuery(selectedOption.label)
        } else {
          setQuery('')
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [selectedOption])

  // Sync query with external value changes (e.g. on resumption)
  useEffect(() => {
    if (value && selectedOption) {
      setQuery(selectedOption.label)
    }
  }, [value, selectedOption])

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Search or scroll to select..."
        className="w-full min-h-[44px] text-base"
        aria-label="Cultural background"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        role="combobox"
        aria-autocomplete="list"
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul
          role="listbox"
          aria-label="Cultural background options"
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredOptions.map((option) => {
            const isSelected = value === option.id
            return (
              <li
                key={option.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 cursor-pointer text-sm min-h-[44px]',
                  'transition-colors duration-100',
                  isSelected
                    ? 'bg-amber-50 text-amber-900 font-medium'
                    : 'text-gray-800 hover:bg-gray-50',
                )}
              >
                {isSelected && (
                  <svg
                    className="h-4 w-4 shrink-0 text-amber-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {!isSelected && <span className="h-4 w-4 shrink-0" />}
                {option.label}
              </li>
            )
          })}
        </ul>
      )}

      {isOpen && filteredOptions.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm text-gray-500">
          No matches found
        </div>
      )}
    </div>
  )
}
