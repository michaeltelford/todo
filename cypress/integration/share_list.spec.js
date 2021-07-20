describe('Share List', () => {
  const listName    = 'Cypress Team Meeting';
  const firstEmail  = 'big.jim@gmail.com';
  const secondEmail = 'wee.jim@gmail.com';

  beforeEach(() => cy.auth());

  it('Visits the app', () => {
    cy.visitApp();
  });

  it('Creates a list', () => {
    cy.createList(listName);
  });

  it('Opens the share list modal', () => {
    cy.get(`div[data-cy='${listName}'] [data-cy=users]`).click();

    cy.contains(`Share ${listName}`);
    cy.contains("This list isn't shared with anyone");
  });

  it('Adds a user', () => {
    cy.get('[data-cy=user-email]').clear().type(firstEmail);
    cy.contains('Add').click();

    cy.contains("This list isn't shared with anyone").should('not.exist');
    cy.contains(firstEmail);
  });

  it('Adds another user', () => {
    cy.get('[data-cy=user-email]').clear().type(secondEmail);
    cy.contains('Add').click();

    cy.contains(firstEmail);
    cy.contains(secondEmail);
  });

  it('Deletes the first user', () => {
    cy.get(`div[data-cy='${firstEmail}'] [data-cy=delete-user]`).click();

    cy.contains(firstEmail).should('not.exist');
    cy.contains(secondEmail);
  });

  it('Closes the share list modal', () => {
    cy.contains('Close').click();
    cy.contains(`Share ${listName}`).should('not.exist');
  });

  it('Deletes the list', () => {
    cy.deleteList(listName);
  });
});
