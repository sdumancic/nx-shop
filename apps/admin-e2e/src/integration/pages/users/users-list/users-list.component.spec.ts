describe('admin', () => {
  beforeEach(() => cy.visit('/iframe.html?id=userslistcomponent--primary'))
  it('should render the component', () => {
    cy.get('admin-users-list').should('exist')
  })
})
