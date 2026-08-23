describe('Posts list server states', () => {
  beforeEach(() => {
    cy.loginAs()
  })

  it('shows loading and then renders the first page of posts', () => {
    cy.intercept(
      {
        method: 'GET',
        hostname: 'jsonplaceholder.typicode.com',
        pathname: '/posts',
      },
      { statusCode: 200, fixture: 'posts.json', delay: 1000 },
    ).as('getPosts')

    cy.visit('/posts')

    cy.contains('[role="status"]', 'Loading posts…').should('be.visible')
    cy.wait('@getPosts').its('response.statusCode').should('equal', 200)

    cy.get('[data-cy="post-card"]').should('have.length', 10)
    cy.get('[data-cy="post-card"]').first().should('contain.text', 'Post #12')
    cy.contains('12 of 12 posts').should('be.visible')
    cy.contains('Page 1 of 2').should('be.visible')
  })

  it('shows an empty state for a successful response with no posts', () => {
    cy.intercept(
      {
        method: 'GET',
        hostname: 'jsonplaceholder.typicode.com',
        pathname: '/posts',
      },
      { statusCode: 200, body: [] },
    ).as('getPosts')

    cy.visit('/posts')
    cy.wait('@getPosts')

    cy.contains('h2', 'No posts found').should('be.visible')
    cy.contains('The request succeeded, but the API returned an empty list.').should('be.visible')
    cy.get('[data-cy="post-card"]').should('not.exist')
  })

  it('shows a recoverable error state after a server failure', () => {
    cy.intercept(
      {
        method: 'GET',
        hostname: 'jsonplaceholder.typicode.com',
        pathname: '/posts',
      },
      { statusCode: 500, body: { message: 'Internal server error' } },
    ).as('getPosts')

    cy.visit('/posts')
    cy.wait('@getPosts').its('response.statusCode').should('equal', 500)

    cy.get('[role="alert"]')
      .should('be.visible')
      .and('contain.text', 'The posts request failed (500).')
    cy.contains('button', 'Try again').should('be.enabled')
    cy.get('[data-cy="post-card"]').should('not.exist')
  })
})
