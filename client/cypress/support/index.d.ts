declare namespace Cypress {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Chainable<Subject = any> {
		getBySel(
			dataTestAttribute: string,
			args?: any
		): Chainable<JQuery<HTMLElement>>
		getBySelLike(
			dataTestPrefixAttribute: string,
			args?: any
		): Chainable<JQuery<HTMLElement>>
		serverRequest(
			url: string,
			options: Cypress.RequestBody = {}
		): Cypress.Chainable<any>
		store(): Cypress.Chainable<any>
		getAppState(): Cypress.Chainable<any>
		createUser(): void
		uploadFile(selector: string, filename: string): Cypress.Chainable<any>
	}
}
