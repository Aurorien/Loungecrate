import { useEffect, useState } from 'react'
import DropdownFiltered, {
  DropdownOption
} from '../components/DropdownFiltered'
import { useLogInStore } from '../utils/store'
import BandList, { Band } from '../components/BandList'
import SelectedBands from '../components/SelectedBands'

function AddEvent() {
  const { username } = useLogInStore()
  const [cities, setCities] = useState<DropdownOption[]>([])
  const [allVenues, setAllVenues] = useState<DropdownOption[]>([])
  const [venues, setVenues] = useState<DropdownOption[]>([])
  const [bands, setBands] = useState<Band[]>([])
  const [eventName, setEventName] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [selectedCity, setSelectedCity] = useState<DropdownOption>()
  const [selectedVenue, setSelectedVenue] = useState<DropdownOption | null>()
  const [selectedBands, setSelectedBands] = useState<Band[]>([])

  useEffect(() => {
    fetch('/dropdowns')
      .then((response) => response.json())
      .then((data) => {
        setCities(data.cities.filter((city: string | null) => city != null))
        setAllVenues(
          data.venues.filter((venue: string | null) => venue != null)
        )
        // setVenues(data.venues.filter((venue: string | null) => venue != null))
        setBands(data.bands.filter((band: string | null) => band != null))
      })
      .catch((error) => {
        console.error('Error fetching dropdown data:', error)
      })
  }, [])

  console.log('bands', bands)

  // const handleCitySelect = (city: DropdownOption) => {
  //   setSelectedCity(city)
  // }

  // const handleCitySelect = (city: DropdownOption) => {
  //   setSelectedCity(city)
  //   const filteredVenues = allVenues.filter((venue) => venue.cityid === city.id) // Filter venues based on city
  //   setVenues(filteredVenues)
  // }

  const handleCitySelect = (city: DropdownOption) => {
    setSelectedCity(city)

    console.log('selectedVenue', selectedVenue)

    if (city.id) {
      console.log('allVenues', allVenues)

      const filteredVenues = allVenues.filter(
        (venue) => venue.cityid === city.id
      )
      setVenues(filteredVenues)
      console.log('filteredVenues', filteredVenues)
    } else {
      setVenues([])
    }
  }

  const handleVenueSelect = (venue: DropdownOption) => {
    setSelectedVenue(venue)
  }

  const handleAddBand = (band: Band) => {
    if (!selectedBands.some((selectedBand) => selectedBand.id === band.id)) {
      setSelectedBands([...selectedBands, band])
    }
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      // const formValues = {
      //   eventName,
      //   eventDescription,
      //   eventDate,
      //   eventTime,
      //   eventCityId: selectedCity?.id,
      //   eventVenueId: selectedVenue?.id,
      //   eventUserName: username,
      //   selectedBands: selectedBands.map((band) => band.id)
      // }

      const formValues = {
        eventName,
        eventDescription,
        eventDate,
        eventTime,
        eventVenueId: selectedVenue?.id,
        eventUserName: username,
        selectedBands: selectedBands.map((band) => band.id)
      }

      console.log('formValues', formValues)

      const response = await fetch('/addevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })

      if (response.ok) {
        console.log('Event added successfully')
      } else {
        console.error('Failed to add event')
      }
    } catch (error) {
      console.error('Error submitting event:', error)
    }
  }

  return (
    <>
      <h1 className="add-event-h1">Add event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
        />
        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Event Description"
        ></textarea>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <DropdownFiltered
          label="Select a city"
          options={cities}
          onSelect={handleCitySelect}
        />
        <DropdownFiltered
          label="Select a venue"
          options={venues}
          onSelect={handleVenueSelect}
          disabled={!selectedCity}
        />
        <BandList bands={bands} onAddBand={handleAddBand} />
        <SelectedBands selectedBands={selectedBands} />

        <button type="submit" className="add-event-submit">
          Submit
        </button>
      </form>
    </>
  )
}

export default AddEvent

// import { useEffect, useState } from 'react'
// import DropdownFiltered from '../components/DropdownFiltered'
// import './AddEvent.css'

// function AddEvent() {
//   const [cities, setCities] = useState<string[]>([])
//   const [venues, setVenues] = useState<string[]>([])
//   const [bands, setBands] = useState<string[]>([])

//   useEffect(() => {
//     fetch('/dropdown-data')
//       .then((response) => response.json())
//       .then((data) => {
//         setCities(data.cities.filter((city: string | null) => city != null))
//         setVenues(data.venues.filter((venue: string | null) => venue != null))
//         setBands(data.bands.filter((band: string | null) => band != null))
//       })
//       .catch((error) => {
//         console.error('Error fetching dropdown data:', error)
//       })
//   }, [])

//   const handleCitySelect = (city: string) => {
//     console.log(`City selected: ${city}`)
//   }

//   const handleVenueSelect = (venue: string) => {
//     console.log(`Venue selected: ${venue}`)
//   }

//   const handleBandSelect = (band: string) => {
//     console.log(`Band selected: ${band}`)
//   }

//   return (
//     <>
//       <h1 className="add-event-h1">Add event</h1>
//       <form>
//         <div className="add-event-name-wrapper">
//           <label className="add-event-name-label">Event name:</label>
//           <input type="text" />
//         </div>
//         <div className="dropdown-wrapper">
//           <DropdownFiltered
//             label="Add a city to the event"
//             options={cities}
//             onSelect={handleCitySelect}
//           />

//           <DropdownFiltered
//             label="Add a venue to the event"
//             options={venues}
//             onSelect={handleVenueSelect}
//           />

//           <DropdownFiltered
//             label="Add bands to the event"
//             options={bands}
//             onSelect={handleBandSelect}
//           />
//         </div>
//         <div className="add-event-submit-wrapper">
//           <button type="submit" className="add-event-submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </>
//   )
// }

// export default AddEvent
