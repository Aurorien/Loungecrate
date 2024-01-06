import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLogInStore } from '../utils/store'
import Nav from '../components/Nav'
import LogInAndRegister from '../components/LogInAndRegister'
import EventList from '../components/EventList'
import EventModal from '../modals/EventModal'
import { Event } from '../utils/interfaces'
import { errorHandling } from '../utils/errorHandling'
import './Home.css'

function Home() {
  const { loggedIn, username } = useLogInStore()
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([])

  useEffect(() => {
    fetch('/myevents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data myevents', data)

        setEvents(data)
      })
      .catch((error) => {
        errorHandling(
          'POST',
          'on fetching registred events for logged in user',
          error
        )
      })
  }, [username])

  const handleEventClick = (event: Event) => {
    setSelectedEvents((prevSelectedEvents) => [...prevSelectedEvents, event])
  }

  const handleCloseModal = (event: Event) => {
    setSelectedEvents((prevSelectedEvents) =>
      prevSelectedEvents.filter((e) => e.eventid !== event.eventid)
    )
  }

  return (
    <>
      {loggedIn ? (
        <>
          <Nav />
          <h1>Loungecrate</h1>
          <Link id="home-add-event-button" to="/addevent">
            Add event
          </Link>
          <div>
            <EventList events={events} onEventClick={handleEventClick} />
            {selectedEvents.map((event) => (
              <EventModal
                key={event.eventid}
                event={event}
                onClose={() => handleCloseModal(event)}
              />
            ))}
          </div>
        </>
      ) : (
        <LogInAndRegister />
      )}
    </>
  )
}

export default Home
