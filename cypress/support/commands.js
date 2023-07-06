// ***********************************************
// This example commands.js shows you how to
// create  custom commands and overwrite
// existing commands.
Cypress.Commands.add('fillMandatoryFieldAndsubmit', function(){
	cy.get('#firstName').type('Luana');
		cy.get('#lastName').type('Gomez');
		cy.get('#email').type('jobupa@getnada.com');
		cy.get('#phone').type('21988018632');
		cy.get('#open-text-area').type('Teste');
		cy.get('button[type="submit"]').click();
		cy.contains('button','Enviar').click();		
})