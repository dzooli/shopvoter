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

  it("Select a new Shop for the logged in user", () => {
    cy.contains("Change Settings");
    cy.get(".btn-primary").click();
    cy.contains("Select shop");
    cy.get(":nth-child(1) > .card-body > .btn").click();
    cy.contains("OK");
  });

  it("Start voting", () => {
    cy.get(".btn-warning").click();
    cy.contains("Rate our service");
  });
});
