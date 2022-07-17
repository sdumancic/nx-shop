describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=usersformcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-users-form').should('exist')
  })
})
