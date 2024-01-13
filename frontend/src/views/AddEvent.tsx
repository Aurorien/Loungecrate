import { useEffect, useState } from 'react'
import DropdownFiltered from '../components/DropdownFiltered'
import { useLogInStore } from '../utils/store'
import BandList from '../components/BandList'
import SelectedBands from '../components/SelectedBands'
import { DropdownOption, Band } from '../utils/interfaces'

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
  const [selectedCity, setSelectedCity] = useState<DropdownOption | null>()
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
        setBands(data.bands.filter((band: string | null) => band != null))
      })
      .catch((error) => {
        console.error('Error fetching dropdown data:', error)
      })
  }, [])

  // console.log('bands', bands)

  const isFormValid = () => {
    return (
      eventName.trim() !== '' &&
      eventDescription.trim() !== '' &&
      eventDate.trim() !== '' &&
      eventTime.trim() !== '' &&
      selectedCity != null &&
      selectedVenue != null &&
      selectedBands.length > 0
    )
  }

  const handleCitySelect = (city: DropdownOption | null) => {
    if (!city && selectedCity) {
      setVenues([])
      setSelectedVenue(null)
      setSelectedCity(null)
    } else {
      setSelectedCity(city)
      if (city) {
        // console.log('allVenues', allVenues)

        const filteredVenues = allVenues.filter(
          (venue) => venue.cityid === city.id
        )
        setVenues(filteredVenues)
        // console.log('filteredVenues', filteredVenues)
      } else {
        setVenues([])
      }
    }
  }

  const handleVenueSelect = (venue: DropdownOption | null) => {
    if (venue) {
      // console.log('Venue selected:', venue)
      setSelectedVenue(venue)
    } else {
      // console.log('Venue selection cleared')
      setSelectedVenue(null)
    }
  }

  const handleAddBand = (band: Band) => {
    if (!selectedBands.some((selectedBand) => selectedBand.id === band.id)) {
      setSelectedBands([...selectedBands, band])
    }
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      const formValues = {
        eventName,
        eventDescription,
        eventDate,
        eventTime,
        eventVenueId: selectedVenue?.id,
        eventUserName: username,
        selectedBands: selectedBands.map((band) => band.id)
      }

      // console.log('formValues', formValues)

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
          data-testid="event-name"
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <textarea
          data-testid="event-description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Event Description"
          required
        ></textarea>
        <input
          data-testid="date"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <input
          data-testid="time"
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          required
        />
        <DropdownFiltered
          testId="city-dropdown"
          label="Select a city"
          options={cities}
          onSelect={handleCitySelect}
          selectedValue={selectedCity}
          resetFilterKey={selectedCity?.id}
        />
        <DropdownFiltered
          testId="venue-dropdown"
          label="Select a venue"
          options={venues}
          onSelect={handleVenueSelect}
          selectedValue={selectedVenue}
          disabled={!selectedCity}
          resetFilterKey={selectedVenue?.id}
        />
        <BandList bands={bands} onAddBand={handleAddBand} />
        <SelectedBands selectedBands={selectedBands} />

        <button
          data-testid="addevent-submit-button"
          type="submit"
          disabled={!isFormValid()}
          className="add-event-submit"
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default AddEvent
