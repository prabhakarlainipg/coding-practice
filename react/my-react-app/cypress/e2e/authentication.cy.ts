import { buildUser, type ApiUser } from '../support/test-data/userFactory'

const adminUser = buildUser()
const authSessionStorageKey = 'projecthub.auth-session'

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

  it('logs in an admin with a stubbed users response', () => {
    //S → Static and realistic? Use fixture.
    // V → Variations required? Use factory.
    // D → Dynamic file changes? Use readFile or generated object.
    cy.fixture<ApiUser[]>('users.json').then((users) => {
      cy.intercept(
        { method: 'GET', pathname: '/users' },
        { statusCode: 200, body: users },
      ).as('getUsers')
    })

    cy.visit('/login')
    cy.get('[data-cy="login-email"]').type(adminUser.email)
    cy.get('[data-cy="login-submit"]').click()

    cy.wait('@getUsers').then((interception) => {
      expect(interception.request.method).to.equal('GET')
      expect(interception.request.url).to.include('/users')
      expect(interception.response?.statusCode).to.equal(200)
      expect(interception.response?.body).to.deep.equal([adminUser])
    })
    //cy.wait(['@getPost', '@getComments']) --> This waits until both requests finish.

    cy.location('pathname').should('equal', '/')
    cy.contains('[role="status"]', 'Welcome back, Leanne Graham.').should('be.visible')
    cy.contains('[data-cy="user-menu"]', 'Leanne Graham · admin').should('be.visible')
  })

  it('returns to the requested protected URL and persists the session', () => {
    cy.intercept(
      { method: 'GET', pathname: '/users' },
      { statusCode: 200, fixture: 'users.json' },
    ).as('getUsers')
    cy.visit('/posts?sort=oldest&page=2')
    cy.location('pathname').should('equal', '/login')

    // Register this after the document visit so it matches the API request, not navigation.
    cy.intercept(
      { method: 'GET', pathname: '/posts' },
      { statusCode: 200, body: [] },
    ).as('getPosts')

    cy.get('[data-cy="login-email"]').type(adminUser.email)
    cy.get('[data-cy="login-submit"]').click()

    cy.wait('@getUsers')
    cy.wait('@getPosts')
    cy.location('pathname').should('equal', '/posts')
    cy.location('search').should('equal', '?sort=oldest&page=2')
  /*
   cy.window() yields the application’s browser window, not Cypress’s own runner window.
   window.localStorage
    window.sessionStorage
    Browser functions
    Global application values
    Browser APIs*/
    cy.window().then((window) => {
      const storedSession = window.localStorage.getItem(authSessionStorageKey)

      expect(storedSession).not.to.equal(null)
      expect(JSON.parse(storedSession!)).to.deep.equal({
        user: {
          id: adminUser.id,
          name: adminUser.name,
          username: adminUser.username,
          email: adminUser.email,
          role: 'admin',
        },
      })
    })
  })

  it('clears the session and returns to login when the user logs out', () => {
    cy.intercept(
      { method: 'GET', pathname: '/users' },
      { statusCode: 200, fixture: 'users.json' },
    ).as('getUsers')

    cy.visit('/login')
    cy.get('[data-cy="login-email"]').type(adminUser.email)
    cy.get('[data-cy="login-submit"]').click()
    cy.wait('@getUsers')
    cy.location('pathname').should('equal', '/')

    cy.get('[data-cy="logout"]').click()

    cy.location('pathname').should('equal', '/login')
    cy.get('[data-cy="user-menu"]').should('not.exist')
    cy.contains('[role="status"]', 'Your local session has been cleared.').should('be.visible')
    cy.window().then((window) => {
      expect(window.localStorage.getItem(authSessionStorageKey)).to.equal(null)
    })
  })

  it('shows a loading state while the users request is pending', () => {
    cy.intercept(
      { method: 'GET', pathname: '/users' },
      { statusCode: 200, fixture: 'users.json', delay: 1000 }, // Simulate a slow API response.
    ).as('getUsers')

    cy.visit('/login')
    cy.get('[data-cy="login-email"]').type(adminUser.email)
    cy.get('[data-cy="login-submit"]').click()

    cy.get('[data-cy="login-submit"]')
      .should('be.disabled')
      .and('contain.text', 'Signing in…')

    cy.wait('@getUsers')
    cy.location('pathname').should('equal', '/')
  })

  it('shows an error and allows retrying after a server failure', () => {
    cy.intercept(
      { method: 'GET', pathname: '/users' },
      { statusCode: 500, body: { message: 'Internal server error' } },
    ).as('getUsers')

    cy.visit('/login')
    cy.get('[data-cy="login-email"]').type(adminUser.email)
    cy.get('[data-cy="login-submit"]').click()
//One property  → its()
// Several checks → then()
    //cy.wait('@getUsers')
    //   .its('request.method')
    //   .should('equal', 'GET')
    //cy.wait('@getUsers').then(({ request, response }) => {
    //   expect(request.method).to.equal('GET')
    //   expect(request.url).to.include('/users')
    //   expect(response?.statusCode).to.equal(200)
    // })
    cy.wait('@getUsers').its('response.statusCode').should('equal', 500)
    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain.text', 'The login request failed (500).')
    cy.get('[data-cy="login-submit"]')
      .should('be.enabled')
      .and('contain.text', 'Sign in')
    cy.location('pathname').should('equal', '/login')
  })

  it('handles a network connection failure', () => {
    cy.intercept(
      { method: 'GET', pathname: '/users' },
      { forceNetworkError: true },
    ).as('getUsers')

    cy.visit('/login')
    cy.get('[data-cy="login-email"]').type(adminUser.email)
    cy.get('[data-cy="login-submit"]').click()

    cy.wait('@getUsers').should('have.property', 'error')
    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain.text', 'Failed to fetch')
    cy.get('[data-cy="login-submit"]').should('be.enabled')
    cy.location('pathname').should('equal', '/login')
  })

  it('handles a successful response with no matching account', () => {
    cy.intercept(
      { method: 'GET', pathname: '/users' },
      { statusCode: 200, body: [] },
    ).as('getUsers')

    cy.visit('/login')
    cy.get('[data-cy="login-email"]').type(adminUser.email)
    cy.get('[data-cy="login-submit"]').click()

    cy.wait('@getUsers').its('response.statusCode').should('equal', 200)
    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain.text', 'No account was found for that email address.')
    cy.location('pathname').should('equal', '/login')
  })

  it('rejects a successful response with an invalid data shape', () => {
    const invalidUser = { ...buildUser({ name: 'Invalid User' }), id: 'not-a-number' }

    cy.intercept(
      { method: 'GET', pathname: '/users' },
      { statusCode: 200, body: [invalidUser] },
    ).as('getUsers')

    cy.visit('/login')
    cy.get('[data-cy="login-email"]').type(adminUser.email)
    cy.get('[data-cy="login-submit"]').click()

    cy.wait('@getUsers').its('response.statusCode').should('equal', 200)
    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain.text', 'The API returned data in an unexpected format.')
    cy.location('pathname').should('equal', '/login')
  })
})

describe('Programmatic authenticated session', () => {
  it('opens the posts page with a cached admin session', () => {
    cy.loginAs()
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
    cy.location('pathname').should('equal', '/posts')
    cy.contains('[data-cy="user-menu"]', 'Leanne Graham · admin').should('be.visible')
  })

  it('reuses the same cached admin session on another protected page', () => {
    cy.loginAs()
    cy.intercept(
      {
        method: 'GET',
        hostname: 'jsonplaceholder.typicode.com',
        pathname: '/todos',
      },
      { statusCode: 200, body: [] },
    ).as('getTodos')

    cy.visit('/todos')

    cy.wait('@getTodos')
    cy.location('pathname').should('equal', '/todos')
    cy.contains('h1', 'Todos').should('be.visible')
  })
})

/*| `.should(callback)` | `.then(callback)` |
|---|---|
| Callback can run repeatedly | Callback runs once |
| Assertions are retried | Assertions are not retried |
| Must avoid side effects | Can perform transformations or queue further commands |
| Best for eventual application state | Best after a value is ready |*/

/*Cypress with Chai
  expect(value).to.equal('GET')
expect(items).to.have.length(2)
expect(user).to.deep.equal(expectedUser)
Jest
expect(value).toBe('GET')
expect(items).toHaveLength(2)
expect(user).toEqual(expectedUser)*/
