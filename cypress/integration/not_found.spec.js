describe('TODO Checklist', () => {
  beforeEach(() => cy.auth());

  const pageNotFoundText = 'Page not found. Click here to return to the home page.';

  it('Visits the app', () => {
    cy.visitPage('/');
    cy.onListsPage();
  });

  it('Navigates to a non existent page', () => {
    cy.visitPage('/billing');
    cy.contains(pageNotFoundText);

    cy.contains('here').click();
    cy.onListsPage();
  });

  it('Navigates to a non existent list', () => {
    cy.visitPage('/list/hello');
    cy.contains("Can't find the list with ID: hello");
    cy.contains(pageNotFoundText);

    cy.contains('here').click();
    cy.onListsPage();
  });

  it('Logs out', () => {
    cy.contains('Logout').click();
    cy.url().should('include', '/auth');
  });
});
