describe("alerts", () => {
	it("should add and remove alerts properly", () => {
		cy.visit("/")

		console.log(cy.getAppState().its("alertLifeTime"))

		cy.getAppState().invoke("enqueueAlert", {
			body: "info alert",
			type: "INFO",
		})
		cy.getAppState().invoke("enqueueAlert", {
			body: "error alert",
			type: "ERROR",
		})
		cy.getAppState().invoke("enqueueAlert", {
			body: "warning alert",
			type: "WARNING",
		})
		cy.getAppState().invoke("enqueueAlert", {
			body: "success alert",
			type: "SUCCESS",
		})

		cy.getAppState().its("alertsQueue").should("have.length", 4)

		cy.getBySel("alert").contains("warning alert")
		cy.getBySel("close-alert-icon").first().click()
		cy.getAppState().its("alertsQueue").should("have.length", 3)

		cy.getAppState().invoke("dequeueAlert")
		cy.getAppState().its("alertsQueue").should("have.length", 2)

	})
})
