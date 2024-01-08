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
