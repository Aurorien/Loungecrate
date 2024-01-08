import { useEffect, useState } from 'react'
import { Event } from '../utils/interfaces'
import useDragger from '../utils/useDragger'
import './EventModal.css'

interface EventModalProps {
  event: Event
  id: string
  onClose: () => void
}

const EventModal: React.FC<EventModalProps> = ({ event, id, onClose }) => {
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
        data-testid="event-modal"
        id={id}
        style={{ zIndex }}
        className="event-modal"
        onClick={bringToFront}
      >
        <div className="modal-content">
          <h2 data-testid="event-modal-title" className="event-modal-title">
            {event.eventname}
          </h2>
          <p data-testid="event-modal-detail">{event.eventdescription}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default EventModal
