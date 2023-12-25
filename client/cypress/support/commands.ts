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

//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }