import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'

Given('Jag är på hemsidan och knappen med finns', () => {
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
})

When('Jag klickar på knappen', () => {
  cy.get('[data-testid="home-add-event-button"]').click()
})

Then('Ska befinna mig på sidan Add event', () => {
  cy.url().should('include', '/addevent')
})
