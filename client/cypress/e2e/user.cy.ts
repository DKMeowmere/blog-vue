import { user } from "../fixtures/user"

context("user", () => {
	describe("given the user payload", () => {
		it("should create user, then logout", () => {
			cy.createUser()

			cy.getAppState().its("user").should("exist")
			cy.getAppState().its("token").should("not.be.empty")

			cy.getBySel("user-name").should("include.text", user.name)
			cy.getAppState()
				.its("user")
				.then(user => {
					cy.getBySel("user-avatar")
						.invoke("attr", "src")
						.should("contains", user._id)
				})
			cy.getBySel("user-biography").should("be.empty")

			cy.getBySel("logout-btn").click()
			cy.getAppState().its("user").should("be.null")
			cy.getAppState().its("token").should("be.empty")
		})
	})
	describe("given the email and password", () => {
		it("should login, then logout", () => {
			cy.createUser()
			cy.getAppState()
				.its("user")
				.then(prevUser => {
					cy.getBySel("logout-btn").click()
					cy.getBySel("login-link").click()
					cy.getBySel("email-input").type(prevUser.email)
					cy.getBySel("password-input").type(user.password)
					cy.getBySel("submit-btn").click()

					cy.getAppState().its("user").should("exist")
					cy.getAppState().its("token").should("not.be.empty")
				})
		})
	})
	describe("given the user payload", () => {
		it("should update user", () => {
			cy.createUser()

			cy.getBySel("avatar-profile-link").click()
			cy.getBySel("update-link").click()
			cy.getBySel("name-input").clear().type("name...")
			cy.uploadFile("file-input", "defaultAvatar2.png")
			cy.getBySel("biography-input").type("test...")

			cy.getBySel("submit-btn").click()
			cy.getBySel("avatar-profile-link").click()

      cy.getBySel("user-name").should("have.text", "name...")
      cy.getBySel("user-biography").should("have.text", "test...")
		})
	})
})
