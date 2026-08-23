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
    cy.wait('@getPosts').its('response.statusCode').should('equal', 500)
    cy.wait('@getPosts').its('response.statusCode').should('equal', 500)

    cy.get('[role="alert"]')
      .should('be.visible')
      .and('contain.text', 'The posts request failed (500).')
    cy.contains('button', 'Try again').should('be.enabled')
    cy.get('[data-cy="post-card"]').should('not.exist')
  })
})

describe('Posts list URL-driven controls', () => {
  beforeEach(() => {
    cy.loginAs()
    cy.intercept(
      {
        method: 'GET',
        hostname: 'jsonplaceholder.typicode.com',
        pathname: '/posts',
      },
      { statusCode: 200, fixture: 'posts.json' },
    ).as('getPosts')

    cy.visit('/posts')
    cy.wait('@getPosts')
  })

  it('debounces search results and clears search state', () => {
    let expectedSearch = ''

    for (const character of 'performance') {
      expectedSearch += character
      cy.get('[data-cy="post-search"]').type(character)
      cy.get('[data-cy="post-search"]').should('have.value', expectedSearch)
      cy.location('search').should('equal', `?q=${expectedSearch}`)
    }

    cy.location('search').should('equal', '?q=performance')
    cy.get('[data-cy="post-card"]')
      .should('have.length', 1)
      .and('contain.text', 'Frontend performance review')
    cy.contains('1 of 12 posts').should('be.visible')

    cy.contains('button', 'Clear').click()

    cy.get('[data-cy="post-search"]').should('have.value', '')
    cy.location('search').should('equal', '')
    cy.get('[data-cy="post-card"]').should('have.length', 10)
  })

  it('sorts posts and keeps the selected sort in the URL', () => {
    cy.get('[data-cy="post-sort"]').select('oldest')

    cy.get('[data-cy="post-sort"]').should('have.value', 'oldest')
    cy.location('search').should('equal', '?sort=oldest')
    cy.get('[data-cy="post-card"]').first().should('contain.text', 'Post #1')

    cy.get('[data-cy="post-sort"]').select('title')

    cy.location('search').should('equal', '?sort=title')
    cy.get('[data-cy="post-card"]')
      .first()
      .should('contain.text', 'Alpha project kickoff')

    cy.get('[data-cy="post-sort"]').select('newest')

    cy.location('search').should('equal', '')
    cy.get('[data-cy="post-card"]').first().should('contain.text', 'Post #12')
  })

  it('paginates, resets the page for a sort change, and restores history', () => {
    cy.contains('button', 'Next').click()

    cy.location('search').should('equal', '?page=2')
    cy.contains('Page 2 of 2').should('be.visible')
    cy.get('[data-cy="post-card"]').should('have.length', 2)
    cy.get('[data-cy="post-card"]').first().should('contain.text', 'Post #2')
    cy.contains('button', 'Next').should('be.disabled')

    cy.get('[data-cy="post-sort"]').select('oldest')

    cy.location('search').should('equal', '?sort=oldest')
    cy.contains('Page 1 of 2').should('be.visible')
    cy.get('[data-cy="post-card"]').first().should('contain.text', 'Post #1')

    cy.go('back')

    cy.location('search').should('equal', '?page=2')
    cy.get('[data-cy="post-sort"]').should('have.value', 'newest')
    cy.contains('Page 2 of 2').should('be.visible')
    cy.get('[data-cy="post-card"]').first().should('contain.text', 'Post #2')
  })
})
