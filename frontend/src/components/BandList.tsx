import React, { useState } from 'react'
import './BandsList.css'

export interface Band {
  id: number
  name: string
  genre: string
  city: string
  description: string
}

interface BandListProps {
  bands: Band[]
  onAddBand: (band: Band) => void
}

const BandList: React.FC<BandListProps> = ({ bands, onAddBand }) => {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase())
  }

  const filteredBands = bands.filter((band) =>
    band.name.toLowerCase().includes(filter)
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Search Bands"
        value={filter}
        onChange={handleFilterChange}
        required
      />
      <ul>
        {filteredBands.map((band) => (
          <li key={band.id}>
            <span>
              {band.name} - {band.genre} - {band.city}
            </span>
            <p>{band.description}</p>
            <div className="bandslist-add" onClick={() => onAddBand(band)}>
              Add
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BandList
