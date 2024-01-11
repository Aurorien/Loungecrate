import React from 'react'
import { Band } from './BandList'

interface SelectedBandsProps {
  selectedBands: Band[]
}

const SelectedBands: React.FC<SelectedBandsProps> = ({ selectedBands }) => {
  return (
    <div>
      <h3>Selected Bands</h3>
      <ul>
        {selectedBands.map((band) => (
          <li key={band.id}>{band.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SelectedBands
