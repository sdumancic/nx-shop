describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=productsformcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-products-form').should('exist')
  })
})
