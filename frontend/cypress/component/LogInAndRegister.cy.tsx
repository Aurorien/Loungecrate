import LogInAndRegister from '../../src/components/LogInAndRegister'

describe('LogInAndRegister component', () => {
  beforeEach(() => {
    cy.intercept('POST', '/register', (req) => {
      if (req.body.username && req.body.password) {
        req.reply(201, { success: true, message: 'Registration successful' })
      } else {
        req.reply(500, 'Internal Server Error')
      }
    })
    cy.mount(<LogInAndRegister />)
    cy.get('[data-testid="login"]').should('exist')
    cy.get('[data-testid="register"]').should('not.exist')

    cy.contains('Register').click()
  })

  it('toggles between login and register forms', () => {
    cy.get('[data-testid="login"]').should('not.exist')
    cy.get('[data-testid="register"]').should('exist')

    cy.contains('Log In').click()

    cy.get('[data-testid="login"]').should('exist')
    cy.get('[data-testid="register"]').should('not.exist')
  })

  it('fails to register with invalid username', () => {
    cy.get('[data-testid="username"]').type('invalid#username')
    cy.get('[data-testid="password"]').type('validpassword')
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="error-message"]').should('exist')
  })

  it('fails to register with invalid password', () => {
    cy.get('[data-testid="username"]').type('validusername')
    cy.get('[data-testid="password"]').type('invalid#password')
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="error-message"]').should('exist')
  })

  it('submits registration form', () => {
    cy.get('[data-testid="username"]').type('newusername')
    cy.get('[data-testid="password"]').type('newpassword')

    cy.get('[data-testid="submit"]').click()

    cy.get('[data-testid="success-message"]').should('exist')
    cy.get('[data-testid="error-message"]').should('not.exist')
  })
})
