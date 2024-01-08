import { useEffect, useState, useRef, ChangeEvent } from 'react'
import './DropdownFiltered.css'

interface DropdownProps {
  label: string
  options: string[]
  onSelect: (value: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [filter, setFilter] = useState<string>('')
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleSelect = (value: string) => {
    onSelect(value)
    setFilter('')
    setShowOptions(false)
  }

  const handleFocus = () => {
    setShowOptions(true)
  }

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <label className="dropdown-label">{label}</label>
      <input
        className="dropdown-input"
        type="text"
        value={filter}
        onChange={handleFilterChange}
        onFocus={handleFocus}
        placeholder="Filter search"
      />
      {showOptions && (
        <ul className="dropdown-list">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              style={{ cursor: 'pointer' }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
