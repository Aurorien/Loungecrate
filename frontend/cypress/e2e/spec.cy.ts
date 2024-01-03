describe('Loungecrate', () => {
  it('is logging in', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#username').type('Shadowood')
    cy.get('#password').type('testuser')
    cy.intercept('POST', '/login').as('postData')
    cy.get('#submit').click()
    cy.wait('@postData').then((interception) => {
      const responseBody = interception.response.body
      expect(responseBody).to.include({
        success: true,
        username: 'Shadowood'
      })
    })
  })
})
