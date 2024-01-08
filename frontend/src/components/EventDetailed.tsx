import { useEffect, useState } from 'react'
import { Event } from '../utils/interfaces'
import useDragger from '../utils/useDragger'
import './EventDetailed.css'

interface EventDetailedProps {
  event: Event
  id: string
  onClose: () => void
}

const EventDetailed: React.FC<EventDetailedProps> = ({
  event,
  id,
  onClose
}) => {
  useDragger(id)
  const [zIndex, setZIndex] = useState(1)

  const bringToFront = () => {
    setZIndex(1000)
  }

  useEffect(() => {
    return () => {
      setZIndex(1)
    }
  }, [])

  return (
    <div>
      <div
        data-testid="event-detailed"
        id={id}
        style={{ zIndex }}
        className="event-detailed"
        onClick={bringToFront}
      >
        <div className="event-detailed-content">
          <h2
            data-testid="event-detailed-title"
            className="event-detailed-title"
          >
            {event.eventname}
          </h2>
          <p data-testid="event-detailed-detail">{event.eventdescription}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailed
