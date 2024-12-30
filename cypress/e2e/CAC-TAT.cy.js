// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {   
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }) 

    it('preenche os campos obrigatórios e envia o formulário', function(){
      const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla sit amet nunc bibendum aliquet'
      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tal')
      cy.get('#email').type('fulano@detal.com')
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' , function(){
      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tal')
      cy.get('#email').type('fulanodetal.com')
      cy.get('#open-text-area').type('Lore ipsum')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com campo não numérico', function(){
      cy.get('#phone').type('abcdefgh')
      cy.get('#phone').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('Fulano')
      cy.get('#lastName').type('de Tal')
      cy.get('#email').type('fulano@detal.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Lore ipsum')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email, telefone e a área de texto', function(){  
      cy.get('#firstName')
        .type('Fulano')
        .should('have.value', 'Fulano')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')  
        .type('de Tal')
        .should('have.value', 'de Tal')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('fulano@detal.com')
        .should('have.value', 'fulano@detal.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('88998989898')
        .should('have.value', '88998989898')
        .clear()
        .should('have.value', '')
        cy.get('#open-text-area')
        .type('Lore ipsum dolor sit amet')
        .should('have.value', 'Lore ipsum dolor sit amet')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) => {
          cy.wrap($radio)
            .check()
          cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]') // seleciona todos os checkboxes
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(($input) => { 
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(($input) => { 
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('example')
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('@example')
        .should(($input) => { 
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
      cy.contains('Talking About Testing')
        .should('be.visible')
    })
})