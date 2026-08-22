import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    /*defaultCommandTimeout: 6000, // default 4000ms, i.e 4 seconds
    requestTimeout: 10_000,  //5000 by default
    responseTimeout: 30_000,
    pageLoadTimeout: 60_000,*/
  },
})
