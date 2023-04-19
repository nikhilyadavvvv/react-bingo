describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.get("#start-button").click();
    const indexes = [4, 9, 14, 19, 20, 21, 22, 23, 24];
    cy.get(".grid-item").each(($button, index) => {
      if (indexes.includes(index)) {
        cy.wrap($button).click();

        cy.get("#bingo-win-screen")
          .should("exist")
          .then(($bingoScreen) => {
            cy.wrap($bingoScreen).click();
          });
      } else {
        cy.wrap($button).click();
      }
    });
  });
});
