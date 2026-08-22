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
    cy.get('input[name="email"]').should('be.visible').and('be.enabled')
    cy.get('button[type="submit"]').should('be.visible').and('be.enabled');
  })
})
