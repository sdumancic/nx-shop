describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=categorieslistcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-categories-list').should('exist')
  })
})
