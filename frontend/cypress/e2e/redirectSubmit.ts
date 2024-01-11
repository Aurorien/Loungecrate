import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'

Given(
  'Jag är på Add Event och jag har fyllt i formuläret så att Submit-knappen är enabled',
  () => {
    cy.visit('http://localhost:5173/')
    cy.intercept('POST', '/login', {
      statusCode: 200,
      body: {
        success: true,
        username: 'Shadowood'
      }
    }).as('loginRequest')
    cy.get('[data-testid="username"]').type('Shadowood')
    cy.get('[data-testid="password"]').type('testuser')
    cy.get('[data-testid="submit"]').click()
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body.success).to.be.true
      expect(interception.response.body.username).to.eq('Shadowood')
    })
    cy.get('[data-testid="home-add-event-button"]').should(
      'have.text',
      'Add event'
    )
    cy.get('[data-testid="home-add-event-button"]').click()
    cy.url().should('include', '/addevent')

    cy.get('[data-testid="addevent-submit-button"]').should('be.disabled')

    cy.get('[data-testid="event-name"]').type('Sample Event')
    cy.get('[data-testid="event-description"]').type(
      'This is a sample event description.'
    )
    cy.get('[data-testid="date"]').type('2025-01-01')
    cy.get('[data-testid="time"]').type('12:00')

    cy.get('[data-testid="city-dropdown-input"]').click()
    cy.get('[data-testid="city-dropdown-list"] li').first().click()

    cy.get('[data-testid="venue-dropdown-input"]').click({ multiple: true })
    cy.get('[data-testid="venue-dropdown-list"] li').first().click()

    cy.get('[data-testid="bandlist"] [data-testid="bandlist-add"]')
      .first()
      .click()

    cy.get('[data-testid="addevent-submit-button"]').should('be.enabled')
  }
)

When('Jag klickar på Submit-knappen', () => {
  cy.get('[data-testid="addevent-submit-button"]').click()
})

Then(
  'Bekräftande text och därefter man slussas till hemsidan och det nya eventet ska finnas med i My events på hemsidan',
  () => {
    cy.contains('Event added successfully').should('be.visible')
    cy.wait(5000)
    cy.url().should('eq', 'http://localhost:5173')
    cy.contains('My Events').should('be.visible')
    cy.contains('Sample Event').should('be.visible')
  }
)
