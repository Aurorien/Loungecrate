import DropdownFiltered from '../components/DropdownFiltered'
import './AddEvent.css'

function AddEvent() {
  // WIP
  const cities = ['City 1', 'City 2', 'City 3']
  const venues = ['Venue 1', 'Venue 2', 'Venue 3']
  const bands = ['Band A', 'Band B', 'Band C']

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
