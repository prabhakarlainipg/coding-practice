import type { PostFormValues } from '../support/commands'

const apiHost = 'jsonplaceholder.typicode.com'

type InvalidFormCase = {
  name: string
  values: PostFormValues
  errorSelector: string
  message: string
}

const validValues: PostFormValues = {
  userId: 5,
  title: 'Valid post title',
  body: 'This body is long enough to pass validation.',
}

const invalidCases: InvalidFormCase[] = [
  {
    name: 'rejects a user ID below the minimum',
    values: { ...validValues, userId: 0 },
    errorSelector: '#userId-error',
    message: 'User ID must be at least 1',
  },
  {
    name: 'rejects a title shorter than five characters',
    values: { ...validValues, title: 'Four' },
    errorSelector: '#title-error',
    message: 'Title must contain at least 5 characters',
  },
  {
    name: 'rejects a body shorter than ten characters',
    values: { ...validValues, body: 'Too short' },
    errorSelector: '#body-error',
    message: 'Body must contain at least 10 characters',
  },
]

describe('Data-driven post form validation', () => {
  beforeEach(() => {
    cy.loginAs({ role: 'admin' })
  })

  invalidCases.forEach(({ name, values, errorSelector, message }) => {
    it(name, () => {
      let requestCount = 0

      cy.intercept(
        { method: 'POST', hostname: apiHost, pathname: '/posts' },
        (request) => {
          requestCount += 1
          request.continue()
        },
      )

      cy.visit('/posts/new')
      cy.fillPostForm(values)
      cy.contains('button', 'Create post').click()

      cy.get(errorSelector)
        .should('be.visible')
        .and('contain.text', message)
      cy.then(() => expect(requestCount).to.equal(0))
    })
  })

  it('accepts values exactly at the minimum text lengths', () => {
    const boundaryValues: PostFormValues = {
      userId: 10,
      title: '12345',
      body: '1234567890',
    }

    cy.intercept(
      { method: 'POST', hostname: apiHost, pathname: '/posts' },
      { statusCode: 201, body: { id: 101, ...boundaryValues } },
    ).as('createPost')

    cy.visit('/posts/new')
    cy.fillPostForm(boundaryValues)
    cy.contains('button', 'Create post').click()

    cy.wait('@createPost')
      .its('request.body')
      .should('deep.equal', boundaryValues)
    cy.get('.post-preview').should('contain.text', 'Post #101')
  })
})
