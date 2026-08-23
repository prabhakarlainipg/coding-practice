import { buildUser } from '../support/test-data/userFactory'

const memberUser = buildUser({
  id: 2,
  name: 'Ervin Howell',
  username: 'Antonette',
  email: 'Shanna@melissa.tv',
})

function stubPostsList() {
  cy.intercept(
    {
      method: 'GET',
      hostname: 'jsonplaceholder.typicode.com',
      pathname: '/posts',
    },
    { statusCode: 200, body: [] },
  ).as('getPosts')
}

describe('Role-based authorization', () => {
  //context() is effectively an alias for Mocha’s describe().
  context('member user', () => {
    beforeEach(() => {
      cy.loginAs({ user: memberUser, role: 'member' })
    })

    it('does not offer post creation from the posts page', () => {
      stubPostsList()
      cy.visit('/posts')
      cy.wait('@getPosts')

      cy.contains('[data-cy="user-menu"]', 'Ervin Howell · member').should('be.visible')
      cy.contains('a', 'Create post').should('not.exist')
    })

    it('redirects direct access to an admin-only route', () => {
      cy.visit('/posts/new')

      cy.location('pathname').should('equal', '/unauthorized')
      cy.contains('h1', 'You don’t have access').should('be.visible')
      cy.contains('code', '/posts/new').should('be.visible')
      cy.contains('a', 'Return to posts').should('be.visible')
    })

    it('does not offer edit or delete actions on post details', () => {
      const post = {
        id: 1,
        userId: 1,
        title: 'A protected post',
        body: 'Members can read this post but cannot manage it.',
      }

      cy.intercept(
        {
          method: 'GET',
          hostname: 'jsonplaceholder.typicode.com',
          pathname: '/posts/1',
        },
        { statusCode: 200, body: post },
      ).as('getPost')
      cy.intercept(
        {
          method: 'GET',
          hostname: 'jsonplaceholder.typicode.com',
          pathname: '/posts/1/comments',
        },
        { statusCode: 200, body: [] },
      ).as('getComments')

      cy.visit('/posts/1')
      cy.wait(['@getPost', '@getComments'])

      cy.contains('h1', post.title).should('be.visible')
      cy.contains('a', 'Edit post').should('not.exist')
      cy.contains('button', 'Delete post').should('not.exist')
    })
  })

  context('admin user', () => {
    beforeEach(() => {
      cy.loginAs()
    })

    it('offers post creation and permits the admin-only route', () => {
      stubPostsList()
      cy.visit('/posts')
      cy.wait('@getPosts')

      cy.contains('a', 'Create post').should('be.visible').click()

      cy.location('pathname').should('equal', '/posts/new')
      cy.contains('h1', 'Create a post').should('be.visible')
    })
  })
})
