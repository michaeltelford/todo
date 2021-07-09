// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// We need to persist the browser's localStorage between tests to re-use the JWT auth token.
Cypress.Commands.add('auth', () => {
  localStorage.setItem('token', Cypress.env('JWT_TOKEN'));
});

Cypress.Commands.add('visitPage', endpoint => {
  const url = `${Cypress.env('CYPRESS_BASE_URL')}${endpoint}`;
  cy.visit(url);

  if (endpoint !== '/') {
    cy.url().should('include', endpoint);
  }
});

Cypress.Commands.add('onListsPage', () => {
  cy.url().should('include', '/lists');
  cy.contains('TODO Checklist');
  cy.contains('Create a new list');
  cy.contains('Logout');
  cy.contains('Contact');
});

Cypress.Commands.add('onListPage', listName => {
  cy.url().should('include', '/list/');
  cy.contains(listName);
  cy.contains('<< Lists');
  cy.contains('Logout');
  cy.contains('Contact');
});

Cypress.Commands.add('addTodo', name => {
  cy.get('[data-cy=add-todo] input').type(name);
  cy.get('[data-cy=add-todo] button').click();
  cy.contains(name);
});

Cypress.Commands.add('containsNumTodos', (numDone, numNotDone) => {
  cy.get('[data-cy=todos-done] div').should('have.length', numDone);
  cy.get('[data-cy=todos-not-done] div').should('have.length', numNotDone);
});
