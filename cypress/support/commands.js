Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('de Tal')
    cy.get('#email').type('fulano@detal.com')
    cy.get('#open-text-area').type('Lore ipsum')
    cy.contains('button', 'Enviar').click()
})