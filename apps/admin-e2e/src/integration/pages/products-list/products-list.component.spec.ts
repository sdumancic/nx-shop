describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=productslistcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-products-list').should('exist')
  })
})
