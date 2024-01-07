import { Event } from '../utils/interfaces'
import './EventList.css'

interface EventListProps {
  events: Event[]
  onEventClick: (event: Event) => void
}

const EventList: React.FC<EventListProps> = ({ events, onEventClick }) => {
  return (
    <div className="event-list-wrapper">
      <h2 data-testid="event-list-h">My Events</h2>
      <ul data-testid="event-list">
        {events.map((event) => (
          <li
            data-testid="event-item"
            key={event.eventid}
            onClick={() => onEventClick(event)}
          >
            {event.eventname}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventList
