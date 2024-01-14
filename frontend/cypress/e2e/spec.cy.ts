describe('Loungecrate e2e', () => {
  it('fails to register with invalid username', () => {
    cy.visit('http://localhost:5173/')
    cy.intercept('POST', '/register', (req) => {
      if (req.body.username && req.body.password) {
        req.reply(201, { success: true, message: 'Registration successful' })
      } else {
        req.reply(500, 'Internal Server Error')
      }
    })
    cy.get('[data-testid="login"]').should('exist')
    cy.get('[data-testid="register"]').should('not.exist')

    cy.contains('Register').click()
    cy.get('[data-testid="username"]').type('invalid#username')
    cy.get('[data-testid="password"]').type('validpassword')
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="error-message"]').should('exist')
  })

  it('fails to register with invalid password', () => {
    cy.visit('http://localhost:5173/')
    cy.intercept('POST', '/register', (req) => {
      if (req.body.username && req.body.password) {
        req.reply(201, { success: true, message: 'Registration successful' })
      } else {
        req.reply(500, 'Internal Server Error')
      }
    })
    cy.get('[data-testid="login"]').should('exist')
    cy.get('[data-testid="register"]').should('not.exist')

    cy.contains('Register').click()
    cy.get('[data-testid="username"]').type('validusername')
    cy.get('[data-testid="password"]').type('invalid#password')
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="error-message"]').should('exist')
  })

  it('submits registration form', () => {
    cy.visit('http://localhost:5173/')
    cy.intercept('POST', '/register', (req) => {
      if (req.body.username && req.body.password) {
        req.reply(201, { success: true, message: 'Registration successful' })
      } else {
        req.reply(500, 'Internal Server Error')
      }
    })
    cy.get('[data-testid="login"]').should('exist')
    cy.get('[data-testid="register"]').should('not.exist')

    cy.contains('Register').click()
    cy.get('[data-testid="username"]').type('newusername')
    cy.get('[data-testid="password"]').type('newpassword')

    cy.get('[data-testid="submit"]').click()

    cy.get('[data-testid="success-message"]').should('exist')
    cy.get('[data-testid="error-message"]').should('not.exist')
  })
  it('handles failed login', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-testid="username"]').type('InvalidUser')
    cy.get('[data-testid="password"]').type('InvalidPassword')

    cy.intercept('POST', '/login', {
      statusCode: 401,
      body: { success: false, message: 'Login failed' }
    }).as('loginFailed')

    cy.get('[data-testid="submit"]').click()

    cy.wait('@loginFailed').then((interception) => {
      const responseBody = interception.response.body
      expect(responseBody.success).to.equal(false)
    })

    cy.get('.error-message').should('contain', 'Login failed')
  })

  beforeEach(() => {
    cy.login('Shadowood', 'testuser')
  })

  it('logs in successfully', () => {
    cy.wait(1000)
  })

  it('go to Add Event and fill the form', () => {
    cy.goToAddEvent()
    cy.fillEventForm()
  })

  it('clicks on submit-button, a confirmation message appears for a while then gets redirected to homepage and the new event is visible in the list My events', () => {
    cy.goToAddEvent()
    cy.fillEventForm()

    cy.get('[data-testid="addevent-submit-button"]').click()
    cy.url().should('include', '#/')
    cy.get('[data-testid="event-list-h"]').should('have.text', 'My Events')
    cy.get('[data-testid="event-list"]').should('be.visible')
    cy.contains('Sample Event').should('exist')
  })
})
