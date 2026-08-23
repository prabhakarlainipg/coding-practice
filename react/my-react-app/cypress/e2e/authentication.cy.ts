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
    const adminUser = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: '-37.3159', lng: '81.1496' },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    }
// register intercept
    cy.intercept(
      { method: 'GET', pathname: '/users' },
      { statusCode: 200, body: [adminUser] },
    ).as('getUsers') // name intercept as getUsers

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
