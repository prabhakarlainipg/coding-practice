const apiHost = 'jsonplaceholder.typicode.com'

describe('Post create and edit mutations', () => {
  beforeEach(() => {
    cy.loginAs({ role: 'admin' })
  })

  it('validates the create form before making a network request', () => {
    let createRequestCount = 0

    cy.intercept(
      { method: 'POST', hostname: apiHost, pathname: '/posts' },
      (request) => {
        createRequestCount += 1
        request.continue()
      },
    )

    cy.visit('/posts/new')
    cy.contains('button', 'Create post').click()

    cy.get('#title-error')
      .should('be.visible')
      .and('contain.text', 'Title must contain at least 5 characters')
    cy.get('#body-error')
      .should('be.visible')
      .and('contain.text', 'Body must contain at least 10 characters')
    cy.get('#title').should('have.attr', 'aria-invalid', 'true')
    cy.get('#body').should('have.attr', 'aria-invalid', 'true')
    cy.then(() => expect(createRequestCount).to.equal(0))
  })

  it('sends validated create data and renders the confirmed server response', () => {
    const input = {
      userId: 3,
      title: 'Cypress mutation testing',
      body: 'Assert the request, response, and resulting user interface.',
    }

    cy.intercept(
      { method: 'POST', hostname: apiHost, pathname: '/posts' },
      {
        statusCode: 201,
        delay: 600,
        body: { id: 101, ...input },
      },
    ).as('createPost')

    cy.visit('/posts/new')
    cy.fillPostForm(input)
    cy.contains('Unsaved changes').should('be.visible')
    cy.contains('button', 'Create post').click()

    cy.contains('button', 'Creating…').should('be.disabled')
    cy.wait('@createPost').then((interception) => {
      expect(interception.request.headers['content-type']).to.include('application/json')
      expect(interception.request.body).to.deep.equal(input)
      expect(interception.response?.statusCode).to.equal(201)
    })

    cy.contains('[role="status"]', 'Post created').should('be.visible')
    cy.get('.post-preview')
      .should('contain.text', input.title)
      .and('contain.text', input.body)
      .and('contain.text', 'User 3 · Post #101')
    cy.contains('a', 'View created post').should('have.attr', 'href', '/posts/101')
  })

  it('keeps entered values available after a create server failure', () => {
    cy.intercept(
      { method: 'POST', hostname: apiHost, pathname: '/posts' },
      { statusCode: 500, body: { message: 'Create service unavailable' } },
    ).as('createPost')

    cy.visit('/posts/new')
    cy.fillPostForm({
      userId: 1,
      title: 'A recoverable draft',
      body: 'The user should not lose this text after a server failure.',
    })
    cy.contains('button', 'Create post').click()
    cy.wait('@createPost')

    cy.get('.mutation-message[role="alert"]')
      .should('be.visible')
      .and('contain.text', 'Post creation failed')
      .and('contain.text', 'The create post request failed (500).')
    cy.get('#title').should('have.value', 'A recoverable draft')
    cy.get('#body').should(
      'have.value',
      'The user should not lose this text after a server failure.',
    )
    cy.contains('button', 'Create post').should('be.enabled')
  })

  it('loads existing values and sends only the edited form through PATCH', () => {
    const originalPost = {
      userId: 4,
      id: 7,
      title: 'Growth experiment results',
      body: 'Results from the latest onboarding experiment.',
    }
    const updatedInput = {
      userId: 4,
      title: 'Updated growth experiment results',
      body: 'The updated analysis includes returning-user conversion data.',
    }

    cy.intercept(
      { method: 'GET', hostname: apiHost, pathname: '/posts/7' },
      { statusCode: 200, body: originalPost },
    ).as('getPost')
    cy.intercept(
      { method: 'PATCH', hostname: apiHost, pathname: '/posts/7' },
      { statusCode: 200, delay: 500, body: { id: 7, ...updatedInput } },
    ).as('updatePost')

    cy.visit('/posts/7/edit')
    cy.wait('@getPost')

    cy.get('#title').should('have.value', originalPost.title)
    cy.get('#body').should('have.value', originalPost.body)
    cy.contains('No changes').should('be.visible')

    cy.fillPostForm(updatedInput)
    cy.contains('button', 'Save changes').click()
    cy.contains('button', 'Saving…').should('be.disabled')

    cy.wait('@updatePost').then((interception) => {
      expect(interception.request.method).to.equal('PATCH')
      expect(interception.request.body).to.deep.equal(updatedInput)
      expect(interception.response?.statusCode).to.equal(200)
    })

    cy.contains('[role="status"]', 'Changes saved').should('be.visible')
    cy.contains('a', 'View updated post').should('have.attr', 'href', '/posts/7')
  })
})
