describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dashboardcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-dashboard').should('exist')
  })
})
