describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=orderslistcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-orders-list').should('exist')
  })
})
