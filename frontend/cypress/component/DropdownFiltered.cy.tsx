import DropdownFiltered from '../../src/components/DropdownFiltered'

describe('DropdownFiltered.tsx', () => {
  const options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]

  it('mounts DropdownFiltered and interacts with it', () => {
    const onSelect = cy.stub()
    cy.mount(
      <DropdownFiltered
        label="Dropdown Label"
        options={options}
        onSelect={onSelect}
        testId="dropdown"
      />
    )

    cy.get('[data-testid="dropdown-label"]').should('contain', 'Dropdown Label')
    cy.get('[data-testid="dropdown-input"]').should('exist')
    cy.get('[data-testid="dropdown-list"]').should('not.exist')
    cy.get('[data-testid="dropdown-input"]').click()
    cy.get('[data-testid="dropdown-list"]').should('be.visible')
    cy.get('[data-testid="dropdown-list"] li').should(
      'have.length',
      options.length
    )

    cy.get('[data-testid="dropdown-list"] li')
      .first()
      .click()
      .then(() => {
        expect(onSelect).to.have.been.calledWith(options[0])
      })

    cy.get('[data-testid="dropdown-input"]').clear()
    cy.get('[data-testid="dropdown-input"]').type('2')
    cy.get('[data-testid="dropdown-list"] li').should('have.length', 1)
  })
})
