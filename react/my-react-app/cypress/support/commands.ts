import { buildUser, type ApiUser } from './test-data/userFactory'

const authSessionStorageKey = 'projecthub.auth-session'
type AuthRole = 'admin' | 'member'

export type LoginAsOptions = {
  role?: AuthRole
  user?: ApiUser
}

export type PostFormValues = {
  userId: number
  title: string
  body: string
}

function createStoredSession(user: ApiUser, role: AuthRole) {
  return {
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role,
    },
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      /** Cache and restore a simulated ProjectHub authentication session. */
      loginAs(options?: LoginAsOptions): Chainable<null>
      /** Replace all values in the shared create/edit post form. */
      fillPostForm(values: PostFormValues): Chainable<void>
    }
  }
}

export function registerCommands() {
  Cypress.Commands.add('fillPostForm', ({ userId, title, body }) => {
    cy.get('#userId').clear().type(String(userId))
    cy.get('#title').clear().type(title)
    return cy.get('#body').clear().type(body).then(() => undefined)
  })

  Cypress.Commands.add('loginAs', (options: LoginAsOptions = {}) => {
    const user = options.user ?? buildUser()
    const role = options.role ?? (user.id === 1 ? 'admin' : 'member')
    const storedSession = createStoredSession(user, role)
    const baseUrl = Cypress.config('baseUrl')

    if (!baseUrl) {
      throw new Error('Cypress baseUrl is required to validate the authentication session.')
    }

    const applicationOrigin = new URL(baseUrl).origin

    return cy.session(
      ['projecthub-auth', user.id, user.email, role],
      () => {
        cy.visit('/login')
        cy.window().then((window) => {
          window.localStorage.setItem(
            authSessionStorageKey,
            JSON.stringify(storedSession),
          )
        })
      },
      {
        //validate() {
        //   cy.getCookie('session_id')
        //     .should('exist')
        // }
        validate() {
          cy.getAllLocalStorage().then((storageByOrigin) => {
            const restoredSession =
              storageByOrigin[applicationOrigin]?.[authSessionStorageKey]

            if (typeof restoredSession !== 'string') {
              throw new Error('The cached ProjectHub authentication session is missing.')
            }

            expect(JSON.parse(restoredSession)).to.deep.equal(storedSession)
          })
        },
      },
    )
  })
}
