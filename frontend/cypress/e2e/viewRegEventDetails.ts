import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'

Given('Jag är inloggad, är på hemsidan och listan finns', () => {
  cy.visit('http://localhost:5173/')
  cy.intercept('POST', '/login', {
    statusCode: 200,
    body: {
      success: true,
      username: 'Shadowood'
    }
  }).as('loginRequest')
  cy.get('#username').type('Shadowood')
  cy.get('#password').type('testuser')
  cy.get('#submit').click()
  cy.wait('@loginRequest').then((interception) => {
    expect(interception.response.statusCode).to.eq(200)
    expect(interception.response.body.success).to.be.true
    expect(interception.response.body.username).to.eq('Shadowood')
  })
  cy.get('[data-testid="event-list-h"]').should('have.text', 'My Events')
  cy.get('[data-testid="event-list"]').should('be.visible')
})

When('Jag klickar på ett event', () => {
  cy.get('[data-testid="event-item"]').first().click()
})

Then(
  'Ska en ruta dyka upp med samma rubrik som eventet och innehålla detaljerad info om eventet',
  () => {
    cy.get('[data-testid="event-detailed"]').should('be.visible')
    cy.get('[data-testid="event-item"]')
      .first()
      .invoke('text')
      .then((eventTitle) => {
        cy.get('[data-testid="event-detailed-title"]').should(
          'have.text',
          eventTitle
        )
      })
    cy.get('[data-testid="event-detailed-detail"]').should('exist')
  }
)
