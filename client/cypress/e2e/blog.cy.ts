context("blog", () => {
	describe("given the blog payload", () => {
		it("should create blog", () => {
			cy.createUser()
			cy.wait(500)
			cy.visit("/blog/create")

			cy.getBySel("title-input").type("title")
			cy.getBySel("source-input").type("source")
			cy.getBySel("tag-input").type("tag")
			cy.getBySel("add-tag-btn").click()
			cy.getBySel("tag-input").type("tag 2")
			cy.getBySel("add-tag-btn").click()
			cy.getBySel("tag").eq(1).click()
			cy.getBySel("tag").should("have.length", 1)
			cy.uploadFile("file-input", "blog.png")
			cy.getBySel("submit-btn").click()
			cy.log(
				"Blog should be created and user should be redirected to update blog page."
			)
			cy.wait(500)

			cy.getBySel("title-input").clear().type("title 2")
			cy.getBySel("submit-btn").click()
			cy.reload()
			cy.getBySel("title-input").should("have.value", "title 2")

			cy.log("Go to preview blog, then return to update form.")
			cy.getBySel("preview-blog-btn").click()
			cy.getBySel("update-blog-btn").click()

			cy.log("Add blog elements.")
			cy.getBySel("update-content-btn").click()

			cy.getBySel("add-text-element-btn").click()
			cy.getBySel("text-element-input").type("test <b> 1 </b>")
			cy.getBySel("edit-text-element-btn").click()

			cy.getBySel("add-image-element-btn").click()
			cy.uploadFile("element-file-input", "blog.png")
			cy.getBySel("image-element-alt-input").type("alt")
			cy.getBySel("edit-image-element-btn").click()

			cy.getBySel("add-quote-element-btn").click()
			cy.getBySel("quote-element-body-input").type("quote")
			cy.getBySel("quote-element-author-input").type("author")
			cy.getBySel("edit-quote-element-btn").click()

			cy.getBySel("add-subtitle-element-btn").click()
			cy.getBySel("subtitle-element-body-input").type("subtitle")
			cy.getBySel("edit-subtitle-element-btn").click()

			cy.getBySel("add-list-element-btn").click()
			cy.getBySel("list-element-title-input").type("list title")
			cy.getBySel("add-list-item").click()
			cy.getBySel("list-item-input").eq(0).type("list item 1")
			cy.getBySel("add-list-item").click()
			cy.getBySel("list-item-input").eq(1).type("list item 2")
			cy.getBySel("edit-list-element-btn").click()

			cy.log("Add and delete element")
			cy.getBySel("add-text-element-btn").click()
			cy.getBySel("delete-element-btn").click()

      cy.getBySel("close-btn").click()
      cy.getBySel("preview-blog-btn").click()
		})
	})
})
