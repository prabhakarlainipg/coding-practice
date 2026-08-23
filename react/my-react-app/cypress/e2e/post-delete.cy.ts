const apiHost = 'jsonplaceholder.typicode.com'
const targetPost = {
  userId: 4,
  id: 7,
  title: 'Growth experiment results',
  body: 'Results from the latest onboarding experiment.',
}

function openTargetPostFromTheList() {
  cy.intercept(
    { method: 'GET', hostname: apiHost, pathname: '/posts' },
    { statusCode: 200, fixture: 'posts.json' },
  ).as('getPosts')
  cy.intercept(
    { method: 'GET', hostname: apiHost, pathname: '/posts/7' },
    { statusCode: 200, body: targetPost },
  ).as('getPost')
  cy.intercept(
    { method: 'GET', hostname: apiHost, pathname: '/posts/7/comments' },
    { statusCode: 200, body: [] },
  ).as('getComments')

  cy.visit('/posts')
  cy.wait('@getPosts')
  cy.contains('[data-cy="post-card"] a', targetPost.title).click()
  cy.wait(['@getPost', '@getComments'])
  cy.contains('h1', targetPost.title).should('be.visible')
}

describe('Post delete mutation', () => {
  beforeEach(() => {
    cy.loginAs({ role: 'admin' })
  })

  it('cancels safely without sending a DELETE request', () => {
    let deleteRequestCount = 0

    cy.intercept(
      { method: 'DELETE', hostname: apiHost, pathname: '/posts/7' },
      (request) => {
        deleteRequestCount += 1
        request.continue()
      },
    )
    openTargetPostFromTheList()

    cy.contains('button', 'Delete post').click()
    cy.get('[role="dialog"]')
      .should('be.visible')
      .and('contain.text', 'Delete this post?')
    cy.get('body').should('have.css', 'overflow', 'hidden')
    cy.get('[role="dialog"]').contains('button', 'Cancel').click()

    cy.get('[role="dialog"]').should('not.exist')
    cy.get('body').should('not.have.css', 'overflow', 'hidden')
    cy.contains('button', 'Delete post').should('be.focused')
    cy.then(() => expect(deleteRequestCount).to.equal(0))
  })

  it('shows the failure and restores the optimistically removed list item', () => {
    let deleteRequestCount = 0

    cy.intercept(
      { method: 'DELETE', hostname: apiHost, pathname: '/posts/7' },
      (request) => {
        deleteRequestCount += 1
        request.reply({
          statusCode: 500,
          body: { message: 'Delete service unavailable' },
        })
      },
    ).as('deletePost')
    openTargetPostFromTheList()

    cy.contains('button', 'Delete post').click()
    cy.get('[role="dialog"]').contains('button', 'Confirm delete').click()
    cy.wait('@deletePost')

    cy.get('[role="dialog"]')
      .should('be.visible')
      .and('contain.text', 'The delete post request failed (500).')
    cy.get('[role="dialog"]').contains('button', 'Confirm delete').should('be.enabled')
    cy.get('[role="dialog"]').contains('button', 'Cancel').should('be.enabled').click()

    cy.contains('a', 'Back to posts').click()
    cy.location('pathname').should('equal', '/posts')
    cy.contains('[data-cy="post-card"]', targetPost.title).should('be.visible')
    cy.then(() => expect(deleteRequestCount).to.equal(1))
  })

  it('locks the dialog while pending and removes the post after success', () => {
    let deleteRequestCount = 0

    cy.intercept(
      { method: 'DELETE', hostname: apiHost, pathname: '/posts/7' },
      (request) => {
        deleteRequestCount += 1
        request.reply({ statusCode: 200, body: {}, delay: 900 })
      },
    ).as('deletePost')
    openTargetPostFromTheList()

    cy.contains('button', 'Delete post').click()
    cy.get('[role="dialog"]').contains('button', 'Confirm delete').click()

    cy.get('[role="dialog"]').contains('button', 'Deleting…').should('be.disabled')
    cy.get('[role="dialog"]').contains('button', 'Cancel').should('be.disabled')
    cy.get('body').type('{esc}')
    cy.get('[role="dialog"]').should('be.visible')

    cy.wait('@deletePost')
    cy.location('pathname').should('equal', '/posts')
    cy.get('[role="dialog"]').should('not.exist')
    cy.contains('[role="status"]', 'Post deleted').should('be.visible')
    cy.contains('[data-cy="post-card"]', targetPost.title).should('not.exist')
    cy.then(() => expect(deleteRequestCount).to.equal(1))
  })
})
