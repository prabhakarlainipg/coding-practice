describe('Application access', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })
 /* cy.get('input')       // Query: retried
      .should('be.visible') // Assertion: retried
      .type('hello') //Action: Execute once */
  it('redirects an unauthenticated visitor to login', () => {
    cy.visit('/')

    cy.location('pathname').should('equal', '/login')
    cy.contains('h1', 'Welcome back').should('be.visible')
    //If the input element doesn’t exist yet, Cypress repeats the query and assertion until they pass or time out.
    cy.get('[data-cy="login-email"]').should('be.visible').and('be.enabled')
    cy.get('[data-cy="login-submit"]').should('be.visible').and('be.enabled')
  })

  it('shows validation feedback for an invalid email', () => {
    cy.visit('/login')
    cy.get('[data-cy="login-email"]').as('emailInput')

    cy.get('@emailInput').type('not-an-email')
    cy.get('[data-cy="login-submit"]').click()

    cy.get('@emailInput') //query
      .should('have.attr', 'aria-invalid', 'true') //assertion
      .and('have.value', 'not-an-email') // and is alias to should... this is also assetion
    cy.get('[data-cy="login-email-error"]')
      .should('be.visible')
      .and('contain.text', 'Enter a valid email address')
    cy.location('pathname').should('equal', '/login')
  })
})

/*| `.should(callback)` | `.then(callback)` |
|---|---|
| Callback can run repeatedly | Callback runs once |
| Assertions are retried | Assertions are not retried |
| Must avoid side effects | Can perform transformations or queue further commands |
| Best for eventual application state | Best after a value is ready |*/
