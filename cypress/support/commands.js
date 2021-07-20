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

Cypress.Commands.add('visitApp', () => {
  cy.visitPage('/');
  cy.onListsPage();
});

Cypress.Commands.add('visitList', name => {
  cy.contains(name).click();
  cy.onListPage(name);
});

Cypress.Commands.add('visitLists', () => {
  cy.contains('<< Lists').click();
  cy.onListsPage();
});

Cypress.Commands.add('createList', name => {
  cy.contains('Create').click();
  cy.contains('Create List');

  cy.get('[data-cy=modal-input]').type(name);
  cy.contains('Save').click();

  cy.contains(name);
  cy.contains('1 items (with 1 still to do)');
  cy.contains(`Created by you on ${new Date().toDateString()}`);
});

Cypress.Commands.add('deleteList', name => {
  cy.contains(name);
  cy.get(`div[data-cy='${name}'] [data-cy=delete]`).click();
  cy.contains(name).should('not.exist');
});

Cypress.Commands.add('onListPage', name => {
  cy.url().should('include', '/list/');
  cy.contains(name);
  cy.contains('<< Lists');
  cy.containsFooter();
});

Cypress.Commands.add('onListsPage', () => {
  cy.url().should('include', '/lists');
  cy.contains('TODO Checklist');
  cy.contains('Create a new list');
  cy.containsFooter();
});

Cypress.Commands.add('containsFooter', () => {
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
