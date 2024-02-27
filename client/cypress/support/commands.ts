/// <reference types="cypress" />

import { user } from "../fixtures/user"

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
Cypress.Commands.add("createUser", () => {
	cy.visit("/user/create")
	cy.getBySel("name-input").type(user.name)
	cy.getBySel("email-input").type(`${crypto.randomUUID()}${user.email}`)
	cy.getBySel("password-input").type(user.password)
	cy.uploadFile("file-input", "bosanskaZastava.png")
	cy.getBySel("submit-btn").click()
})
Cypress.Commands.add("uploadFile", (selector, filename) => {
	return cy.getBySel(selector).selectFile(`cypress/fixtures/files/${filename}`)
})
