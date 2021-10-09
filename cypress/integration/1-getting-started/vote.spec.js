/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Login to ShopVoter, select a new shop and start voting", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/");

    const mailAddr = "user@email.com";
    const pass = "123";
    cy.contains("Log in").click();
    cy.get("input[type=email]").type(`${mailAddr}`);
    cy.get("input[type=password]").type(`${pass}{enter}`);
    cy.contains("Start And Lock");
    cy.contains("Change Settings");
  });

  it("Do vote", () => {
    cy.visit("/welcome/started");
    cy.contains("Rate our service");
    cy.get(
      "div.flex-row.justify-content-between.mb-0.pb-0.pt-4 > button:nth-child(1) > span"
    ).click();
    cy.contains("Please wait");
  });
});
