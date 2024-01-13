import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { DropdownOption } from '../utils/interfaces'
import './DropdownFiltered.css'

interface DropdownProps {
  label: string
  options: DropdownOption[]
  onSelect: (value: DropdownOption | null) => void
  disabled?: boolean
  resetFilterKey?: number | null
  selectedValue?: DropdownOption | null
  testId?: string
}

const DropdownFiltered: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  selectedValue,
  disabled = false,
  resetFilterKey,
  testId
}) => {
  console.log('Resetting filter for key:', resetFilterKey)
  const [filter, setFilter] = useState<string>('')
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
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
      <label data-testid={`${testId}-label`} className="dropdown-label">
        {label}
      </label>
      {renderSelectedValue()}
      <input
        data-testid={`${testId}-input`}
        className="dropdown-input"
        type="text"
        value={filter}
        onChange={handleFilterChange}
        onFocus={handleFocus}
        placeholder="Filter search"
        disabled={disabled}
      />
      {showOptions && (
        <ul data-testid={`${testId}-list`} className="dropdown-list">
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

export default DropdownFiltered
