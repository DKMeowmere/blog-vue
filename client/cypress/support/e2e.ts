import './commands'

beforeEach(() => {
	cy.serverRequest("/api/reset")
})