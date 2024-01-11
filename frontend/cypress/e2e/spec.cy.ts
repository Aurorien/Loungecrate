describe('Connection Fe Be', () => {
  it('tries a non-db connected endpoint to confirm connection frontend backend', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#be-connection').click()
    cy.contains('Contact with backend confirmed').should('exist')
  })
})

describe('Loungecrate', () => {
  it('is logging in', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-testid="username"]').type('Shadowood')
    cy.get('[data-testid="password"]').type('testuser')
    console.log('Submitting login form')
    cy.intercept('POST', '/login').as('postData')
    cy.get('[data-testid="submit"]').click()
    cy.wait('@postData').then((interception) => {
      console.log('Login request intercepted', interception)
      const responseBody = interception.response.body
      console.log('Response Body:', responseBody.success)
      expect(responseBody.success).to.equal(true)
    })
  })
})

describe('AddEvent form tests', () => {
  it('should enable the submit button when the form is filled correctly', () => {
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
  })
})
