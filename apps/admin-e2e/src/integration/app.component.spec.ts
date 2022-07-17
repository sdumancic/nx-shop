describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-root').should('exist')
  })
})
