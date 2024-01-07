import { Event } from '../utils/interfaces'
import useDragger from '../utils/useDragger'
import './EventModal.css'

interface EventModalProps {
  event: Event
  onClose: () => void
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  useDragger('event-modal')

  return (
    <div className="event-modal-container">
      <div data-testid="event-modal" id="event-modal" className="event-modal">
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
