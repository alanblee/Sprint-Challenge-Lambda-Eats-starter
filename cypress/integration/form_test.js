describe("Test inputs and submit form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/pizza");
  });

  it("Adds text to inputs and submits the form", function() {
    //check text inputs
    cy.get('[data-cy="orderFor"]')
      .type("Alan")
      .should("have.value", "Alan");
    cy.get('[data-cy="specialInstructions"]')
      .type("specialInstructions")
      .should("have.value", "specialInstructions");
    //check radio input
    cy.get('[data-cy="Garlic Ranch"]').check();
    //check select input
    cy.get('[data-cy="size"]')
      .select("X-Large")
      .should("have.value", "X-Large");

    // check checkbox
    cy.get('[data-cy="Sausage"]')
      .check()
      .should("be.checked");
    cy.get('[data-cy="Pepperoni"]')
      .check()
      .should("be.checked");
    cy.get('[data-cy="SpicyItalianSausage"]')
      .check()
      .should("be.checked");
    cy.get('[data-cy="GreenPepper"]')
      .check()
      .should("be.checked");
    cy.get('[data-cy="RoastedGarlic"]')
      .check()
      .should("be.checked");
    cy.get('[data-cy="ArtichokeHearts"]')
      .check()
      .should("be.checked");
    cy.get('[data-cy="ThreeCheese"]')
      .check()
      .should("be.checked");
    cy.get('[data-cy="BlackOlives"]')
      .check()
      .should("be.checked");
    cy.get('[data-cy="DicedTomatos"]')
      .check()
      .should("be.checked");

    //submits form
    cy.get('[data-cy="form-btn"]').click();
  });
});
