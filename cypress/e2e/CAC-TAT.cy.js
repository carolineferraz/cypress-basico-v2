// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {   
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }) 
    it.only('preenche os campos obrigatórios e envia o formulário', function(){
      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tal')
      cy.get('#email').type('fulano@detal.com')
      cy.get('#open-text-area').type('Mensagem de teste')
      cy.get('button[type="submit"]').click()
      cy.get('.success').should('be.visible')
    })
})
