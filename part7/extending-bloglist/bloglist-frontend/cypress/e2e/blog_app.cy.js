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

    describe('When logged in', function() {
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

      it('A blog can be deleted', function() {
        cy.createBlog({ title: 'authorised', author: 'Salvador D', url: 'httpss', likes: 0 })
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain','bot posting by human 1')
      })

      it('A blog cant be deleted by another user', function() {
        cy.createBlog({ title: 'authorised', author: 'Salvador D', url: 'httpss', likes: 0 })
        cy.createUser({ username: 'bot2', name: 'Bot 2', password: 'notAbot2' })
        cy.login({ username: 'bot2', password: 'notAbot2' })
        cy.contains('view').click()
        cy.get('.more-details').should('not.contain','removes')
      })

      it('blogs are sorted by numer of likes', function(){
        cy.createBlog({ title: 'blog1', author: 'Salvador D', url: 'httpss', likes: 0 })
        cy.createBlog({ title: 'blog2', author: 'Salvador D', url: 'httpss', likes: 0 })
        cy.createBlog({ title: 'blog3', author: 'Salvador D', url: 'httpss', likes: 0 })
        cy.get('.view').each( item => item.click())
        cy.contains('like').dblclick().click()
        cy.get('.likeBtn')
          .then(elems => {
            cy.wrap(elems[2]).click()
          })
        cy.visit('http://localhost:3000')
        cy.get('.likes')
          .then(elems => [Number(elems[0].innerText), Number(elems[1].innerText), Number(elems[2].innerText)])
          .then(likeList => {
            expect(likeList).to.deep.equal([3, 1, 0])
          })
      })
    })
  })
})