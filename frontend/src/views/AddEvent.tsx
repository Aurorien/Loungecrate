import { useEffect, useState } from 'react'
import DropdownFiltered from '../components/DropdownFiltered'
import './AddEvent.css'

function AddEvent() {
  const [cities, setCities] = useState<string[]>([])
  const [venues, setVenues] = useState<string[]>([])
  const [bands, setBands] = useState<string[]>([])

  useEffect(() => {
    fetch('/dropdown-data')
      .then((response) => response.json())
      .then((data) => {
        setCities(data.cities.filter((city: string | null) => city != null))
        setVenues(data.venues.filter((venue: string | null) => venue != null))
        setBands(data.bands.filter((band: string | null) => band != null))
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
            options={cities}
            onSelect={handleCitySelect}
          />

          <DropdownFiltered
            label="Add a venue to the event"
            options={venues}
            onSelect={handleVenueSelect}
          />

          <DropdownFiltered
            label="Add bands to the event"
            options={bands}
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
