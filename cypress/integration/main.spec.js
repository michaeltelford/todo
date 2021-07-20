describe('Main', () => {
  const originalListName = 'Cypress Zoo';
  const updatedListName  = 'Cypress Animals';

  beforeEach(() => cy.auth());

  it('Visits the app', () => {
    cy.visitApp();
  });

  it('Creates a list', () => {
    cy.createList(originalListName);
  });

  it('Edits the list name', () => {
    cy.get(`div[data-cy='${originalListName}'] [data-cy=edit]`).click();
    cy.contains('Edit List');
    cy.contains(originalListName);

    cy.get('[data-cy=modal-input]').clear().type(updatedListName);
    cy.contains('Save').click();

    cy.contains(originalListName).should('not.exist');
    cy.contains(updatedListName);
  });

  it('Opens the list', () => {
    cy.visitList(updatedListName);
    cy.contains('0 / 1 Done');
    cy.contains('Add some TODOs');

    cy.containsNumTodos(0, 1);
  });

  it('Adds some TODOs', () => {
    cy.addTodo('Elephant');
    cy.contains('0 / 2 Done');

    cy.addTodo('Giraffe');
    cy.contains('0 / 3 Done');

    cy.addTodo('Zebra');
    cy.contains('0 / 4 Done');

    cy.addTodo('Lion');
    cy.contains('0 / 5 Done');

    cy.addTodo('Monkey');
    cy.contains('0 / 6 Done');

    cy.containsNumTodos(0, 6);
  });

  it('Toggles some TODOs', () => {
    cy.contains('Giraffe').click();
    cy.contains('1 / 6 Done');

    cy.contains('Monkey').click();
    cy.contains('2 / 6 Done');

    cy.containsNumTodos(2, 4);
  });

  it('Deletes some TODOs', () => {
    cy.get('div[data-cy="Add some TODOs"] [data-cy=delete]').click();
    cy.contains('2 / 5 Done');

    cy.get('div[data-cy=Monkey] [data-cy=delete]').click();
    cy.contains('Monkey').should('not.exist');
    cy.contains('1 / 4 Done');

    cy.containsNumTodos(1, 3);
  });

  it('Edits a TODO', () => {
    cy.get('div[data-cy=Lion] [data-cy=edit]').click();
    cy.contains('Edit TODO Item');
    cy.contains('Lion');

    cy.get('[data-cy=modal-input]').clear().type('Cheetah');
    cy.contains('Save').click();
    cy.contains('Lion').should('not.exist');
    cy.contains('Cheetah');
    cy.contains('1 / 4 Done');

    cy.containsNumTodos(1, 3);
  });

  it('Navigates to all lists', () => {
    cy.visitLists();
  });

  it('Deletes the list', () => {
    cy.deleteList(updatedListName);
  });

  it('Logs out', () => {
    cy.contains('Logout').click();
    cy.url().should('include', '/auth');
  });
});
