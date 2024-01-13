import AddEvent from '../../src/views/AddEvent'
import { HashRouter } from 'react-router-dom'

describe('AddEvent Component', () => {
  it('should enable the submit button when the form is filled correctly', () => {
    cy.mount(
      <HashRouter>
        <AddEvent />
      </HashRouter>
    )
    cy.get('[data-testid="addevent-submit-button"]').should('be.disabled')

    cy.get('[data-testid="event-name"]').type('Sample Event')
    cy.get('[data-testid="addevent-submit-button"]').should('be.disabled')

    cy.get('[data-testid="event-description"]').type(
      'This is a sample event description.'
    )
    cy.get('[data-testid="addevent-submit-button"]').should('be.disabled')

    cy.get('[data-testid="date"]').type('2025-01-01')
    cy.get('[data-testid="addevent-submit-button"]').should('be.disabled')

    cy.get('[data-testid="time"]').type('12:00')
    cy.get('[data-testid="addevent-submit-button"]').should('be.disabled')

    cy.get('[data-testid="city-dropdown-input"]').click()
    cy.get('[data-testid="city-dropdown-list"] li').first().click()
    cy.get('[data-testid="addevent-submit-button"]').should('be.disabled')

    cy.get('[data-testid="venue-dropdown-input"]').click()
    cy.get('[data-testid="venue-dropdown-list"] li').first().click()
    cy.get('[data-testid="addevent-submit-button"]').should('be.disabled')

    cy.get('[data-testid="bandlist"] [data-testid="bandlist-add"]')
      .first()
      .click()

    cy.get('[data-testid="addevent-submit-button"]').should('be.enabled')
  })
})
