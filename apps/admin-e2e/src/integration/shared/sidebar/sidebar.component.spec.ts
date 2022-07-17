describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sidebarcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-sidebar').should('exist')
  })
})
