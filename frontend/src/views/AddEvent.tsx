import { useEffect, useState } from 'react'
import DropdownFiltered from '../components/DropdownFiltered'
import './AddEvent.css'

interface DropdownOption {
  name: string
}

function AddEvent() {
  const [cities, setCities] = useState<DropdownOption[]>([])
  const [venues, setVenues] = useState<DropdownOption[]>([])
  const [bands, setBands] = useState<DropdownOption[]>([])

  useEffect(() => {
    fetch('/dropdown-data')
      .then((response) => response.json())
      .then((data) => {
        setCities(data.cities)
        setVenues(data.venues)
        setBands(data.bands)
      })
      .catch((error) => {
        console.error('Error fetching dropdown data:', error)
      })
  }, [])

  const handleCitySelect = (city: string) => {
    console.log(`City selected: ${city}`)
  }

  const handleVenueSelect = (venue: string) => {
    console.log(`Venue selected: ${venue}`)
  }

  const handleBandSelect = (band: string) => {
    console.log(`Band selected: ${band}`)
  }

  return (
    <>
      <h1 className="add-event-h1">Add event</h1>
      <form>
        <div className="add-event-name-wrapper">
          <label className="add-event-name-label">Event name:</label>
          <input type="text" />
        </div>
        <div className="dropdown-wrapper">
          <DropdownFiltered
            label="Add a city to the event"
            options={cities.map((city) => city.name)}
            onSelect={handleCitySelect}
          />

          <DropdownFiltered
            label="Add a venue to the event"
            options={venues.map((venue) => venue.name)}
            onSelect={handleVenueSelect}
          />

          <DropdownFiltered
            label="Add bands to the event"
            options={bands.map((band) => band.name)}
            onSelect={handleBandSelect}
          />
        </div>
        <div className="add-event-submit-wrapper">
          <button type="submit" className="add-event-submit">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default AddEvent
