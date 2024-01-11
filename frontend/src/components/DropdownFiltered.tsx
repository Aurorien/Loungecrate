import { useEffect, useState, useRef, ChangeEvent } from 'react'
import './DropdownFiltered.css'

export interface DropdownOption {
  id: number
  name: string
  cityid?: number
}

interface DropdownProps {
  label: string
  options: DropdownOption[]
  onSelect: (value: DropdownOption | null) => void
  disabled?: boolean
  resetFilterKey?: number | null
  selectedValue?: DropdownOption | null
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  selectedValue,
  disabled = false,
  resetFilterKey
}) => {
  console.log('Resetting filter for key:', resetFilterKey)
  const [filter, setFilter] = useState<string>('')
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
    console.log('filter Dropdown', filter)
  }

  useEffect(() => {
    setFilter('')
  }, [resetFilterKey])

  const handleSelect = (option: DropdownOption) => {
    onSelect(option)
    setFilter(option.name)
    setShowOptions(false)
  }

  const handleFocus = () => {
    setShowOptions(true)
  }

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(filter.toLowerCase())
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

  const renderSelectedValue = () => {
    if (!selectedValue) return null

    return (
      <div className="selected-value">
        {selectedValue.name}
        <button onClick={() => onSelect(null)}>X</button>
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <label className="dropdown-label">{label}</label>
      {renderSelectedValue()}
      <input
        className="dropdown-input"
        type="text"
        value={filter}
        onChange={handleFilterChange}
        onFocus={handleFocus}
        placeholder="Filter search"
        disabled={disabled}
      />
      {showOptions && (
        <ul className="dropdown-list">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              style={{ cursor: 'pointer' }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
