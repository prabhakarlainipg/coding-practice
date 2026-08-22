describe('Application access', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('redirects an unauthenticated visitor to login', () => {
    cy.visit('/')

    cy.location('pathname').should('equal', '/login')
    cy.contains('h1', 'Welcome back').should('be.visible')
    cy.get('input[name="email"]').should('be.visible').and('be.enabled')
  })
})
