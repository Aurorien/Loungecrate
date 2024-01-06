import React from 'react'
import { Event } from '../utils/interfaces'

interface EventModalProps {
  event: Event
  onClose: () => void
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  return (
    <div data-testid="event-modal" className="event-modal">
      <div className="modal-content">
        <h2 data-testid="event-modal-title">{event.eventname}</h2>
        <p data-testid="event-modal-detail">{event.eventdescription}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default EventModal
