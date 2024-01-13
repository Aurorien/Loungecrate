/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('http://localhost:5173/')
  cy.get('[data-testid="username"]').type(username)
  cy.get('[data-testid="password"]').type(password)

  cy.intercept('POST', '/login', {
    statusCode: 200,
    body: {
      success: true,
      username: username
    }
  }).as('loginSuccess')

  cy.get('[data-testid="submit"]').click()

  cy.wait('@loginSuccess')
})

Cypress.Commands.add('goToAddEvent', () => {
  cy.get('[data-testid="home-add-event-button"]')
    .should('have.text', 'Add event')
    .should('not.be.empty')
  cy.get('[data-testid="home-add-event-button"]').click()
  cy.url().should('include', '/addevent')
})

Cypress.Commands.add('fillEventForm', () => {
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
})
