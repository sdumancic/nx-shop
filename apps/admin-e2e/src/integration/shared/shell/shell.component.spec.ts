describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=shellcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-shell').should('exist')
  })
})
