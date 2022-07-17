describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=ordersdetailcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-orders-detail').should('exist')
  })
})
