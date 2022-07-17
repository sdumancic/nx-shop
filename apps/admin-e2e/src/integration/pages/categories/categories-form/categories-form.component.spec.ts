describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=categoriesformcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-categories-form').should('exist')
  })
})
