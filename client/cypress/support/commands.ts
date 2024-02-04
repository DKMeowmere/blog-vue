/// <reference types="cypress" />

Cypress.Commands.add("getBySel", (selector, ...args) => {
	return cy.get(`[data-cy=${selector}]`, ...args)
})

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
	return cy.get(`[data-cy*=${selector}]`, ...args)
})

Cypress.Commands.add("serverRequest", (url, options) =>
	cy.request({
		url: `${Cypress.env("SERVER_URL")}${url}`,
		...(options as Record<string, unknown>),
	})
)

Cypress.Commands.add("store", () => cy.window().its("store"))
Cypress.Commands.add("getAppState", () => cy.store().its("app"))
