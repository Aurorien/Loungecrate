describe('Loungecrate', () => {
  it('is logging in', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#username').type('Shadowood')
    cy.get('#password').type('testuser')
    console.log('Submitting login form')
    cy.intercept('POST', '/login').as('postData')
    cy.get('#submit').click()
    cy.wait('@postData').then((interception) => {
      console.log('Login request intercepted', interception)
      const responseBody = interception.response.body
      console.log('Response Body:', responseBody.success)
      expect(responseBody.success).to.equal(true)
    })
  })
})
