import Eventlist from '../../src/components/EventList'

describe('Eventlist.tsx', () => {
  const events = [
    {
      eventid: 1,
      eventname: 'Event 1',
      eventdescription: 'Description for Event 1'
    },
    {
      eventid: 2,
      eventname: 'Event 2',
      eventdescription: 'Description for Event 2'
    }
  ]

  it('mounts Eventlist and verifies that it has a title', () => {
    const mockOnEventClick = cy.stub()
    cy.mount(<Eventlist events={events} onEventClick={mockOnEventClick} />)
    cy.get('[data-testid="event-list-h"]').should('contain', 'My Events')
    cy.get('[data-testid="event-list"]')
      .find('[data-testid="event-item"]')
      .should('have.length', events.length)
    events.forEach((event, index) => {
      cy.get(`[data-testid="event-item"]:eq(${index})`)
        .should('contain', event.eventname)
        .click()
        .then(() => {
          expect(mockOnEventClick).to.have.been.calledWith(event)
        })
    })
  })
})
