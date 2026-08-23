const apiRoute = {
  method: 'GET',
  hostname: 'jsonplaceholder.typicode.com',
} as const

describe('Post details parallel requests', () => {
  beforeEach(() => {
    cy.loginAs()
  })

  it('renders the post and comments when the parallel requests finish in either order', () => {
    cy.intercept(
      { ...apiRoute, pathname: '/posts/7' },
      {
        statusCode: 200,
        delay: 800,
        body: {
          userId: 4,
          id: 7,
          title: 'Growth experiment results',
          body: 'Results from the latest onboarding experiment.',
        },
      },
    ).as('getPost')

    cy.intercept(
      { ...apiRoute, pathname: '/posts/7/comments' },
      { statusCode: 200, delay: 200, fixture: 'comments.json' },
    ).as('getComments')

    cy.visit('/posts/7')

    cy.contains('[role="status"]', 'Loading post…').should('be.visible')
    cy.contains('[role="status"]', 'Loading comments…').should('be.visible')

    // An alias array waits until every matching request completes. The order
    // in which the network responses finish does not matter.
    cy.wait(['@getPost', '@getComments'])

    cy.contains('h1', 'Growth experiment results').should('be.visible')
    cy.contains('Results from the latest onboarding experiment.').should('be.visible')
    cy.contains('2 comments').should('be.visible')
    cy.contains('h3', 'Useful experiment summary').should('be.visible')
    cy.contains('Can we run the same experiment for returning users?').should('be.visible')
  })

  it('keeps the post usable when only the comments request fails', () => {
    cy.intercept(
      { ...apiRoute, pathname: '/posts/7' },
      {
        statusCode: 200,
        body: {
          userId: 4,
          id: 7,
          title: 'Growth experiment results',
          body: 'Results from the latest onboarding experiment.',
        },
      },
    ).as('getPost')

    cy.intercept(
      { ...apiRoute, pathname: '/posts/7/comments' },
      { statusCode: 500, body: { message: 'Comments service unavailable' } },
    ).as('getComments')

    cy.visit('/posts/7')
    cy.wait('@getPost').its('response.statusCode').should('equal', 200)

    // The configured React Query policy performs the initial request plus
    // two retries for a 5xx response.
    cy.wait('@getComments')
    cy.wait('@getComments')
    cy.wait('@getComments')

    cy.contains('h1', 'Growth experiment results').should('be.visible')
    cy.get('.comments [role="alert"]')
      .should('be.visible')
      .and('contain.text', 'The comments request failed (500).')
    cy.get('.comments').contains('button', 'Try again').should('be.enabled')
  })

  it('rejects an invalid route parameter without making API requests', () => {
    let requestCount = 0

    cy.intercept(
      { ...apiRoute, pathname: '/posts/**' },
      (request) => {
        requestCount += 1
        request.continue()
      },
    )

    cy.visit('/posts/not-a-number')

    cy.get('[role="alert"]')
      .should('be.visible')
      .and('contain.text', 'Invalid post address')
      .and('contain.text', 'The post ID must be a positive whole number.')
    cy.then(() => expect(requestCount).to.equal(0))
  })

  it('does not retry a post 404 response', () => {
    let postRequestCount = 0

    cy.intercept(
      { ...apiRoute, pathname: '/posts/999' },
      (request) => {
        postRequestCount += 1
        request.reply({ statusCode: 404, body: { message: 'Post not found' } })
      },
    ).as('getPost')

    // Comments are a separate parallel query, so stub them as well.
    cy.intercept(
      { ...apiRoute, pathname: '/posts/999/comments' },
      { statusCode: 200, body: [] },
    ).as('getComments')

    cy.visit('/posts/999')
    cy.wait('@getPost')
    cy.wait('@getComments')

    cy.get('.state-panel[role="alert"]')
      .should('be.visible')
      .and('contain.text', 'We couldn’t load this post')
      .and('contain.text', 'The post request failed (404).')
    cy.then(() => expect(postRequestCount).to.equal(1))
  })
})
