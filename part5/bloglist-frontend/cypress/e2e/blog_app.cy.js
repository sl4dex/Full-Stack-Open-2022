describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ username: 'bot', name: 'Bot', password: 'notAbot' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('bot')
      cy.get('#password').type('notAbot')
      cy.contains('login').click()
      cy.contains('Bot logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('person')
      cy.get('#password').type('letMeIn!')
      cy.contains('login').click()
      cy.contains('Wrong credentials')
    })

    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'bot', password: 'notAbot' })
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('bot posting')
        cy.get('#author').type('human 1')
        cy.get('#url').type('facebook.com')
        cy.contains('post').click()
        cy.contains('bot posting by human 1')
      })

      it('A blog can be liked', function() {
        cy.createBlog({ title: 'authorised', author: 'Salvador D', url: 'httpss', likes: 0 })
        cy.contains('view').click()
        cy.contains('like').dblclick()
        cy.contains('likes: 2')
      })
    })
  })
})