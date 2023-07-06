///<reference types="Cypress"/>



describe('verificar o título da aplicação', function() {
	beforeEach(function() {
		cy.visit('src/index.html')
	})

	it('Deve visitar uma página e verificar o título', function() {
		cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
	})
	it('preenche os campos obrigatórios e envia o formulário', function() {
		const longText = 'Maria, const const const constv constv const const constvv const';

		cy.get('#firstName').type('Luana');
		cy.get('#lastName').type('Gomez');
		cy.get('#email').type('jobupa@getnada.com');
		cy.get('#phone').type('21988018632');
		cy.get('#open-text-area').type(longText, { delay: 0 });
		cy.contains('button','Enviar').click();
		cy.get('.success').should('exist');
	})
	it('Exibe mensagem de erro ao submeter o formulário com um email com formatação invavlida', function() {

		cy.get('#firstName').type('Luana');
		cy.get('#lastName').type('Gomez');
		cy.get('#email').type('jobupa.getnada.com');
		cy.get('#phone').type('21988018632');
		cy.get('#open-text-area').type('Teste');
		cy.contains('button','Enviar').click();
		cy.get('.error').should('exist');
	})
	it('Campo telefone continua vazio quando preenchido com valor não numérico', function() {
		cy.get('#phone')
			.type('adahkjhdhjfhjdfhjdhf')
			.should('have.value', '')
	})
	it('Campo telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
		cy.get('#firstName').type('Luana');
		cy.get('#lastName').type('Gomez');
		cy.get('#email').type('jobupa@getnada.com');
		cy.get('#phone-checkbox').click();
		cy.get('#open-text-area').type('Teste');
		cy.contains('button','Enviar').click();
		cy.get('.error').should('exist');
	})
	it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
		cy.get('#firstName')
		.type('Luana')
		.should('have.value','Luana')
		.clear()
		.should('have.value','')
		
		cy.get('#lastName')
		.type('Gomez')
		.should('have.value','Gomez')
		.clear()
		.should('have.value','')
		
		cy.get('#email')
		.type('jobupa@getnada.com')
		.should('have.value','jobupa@getnada.com')
		.clear()
		.should('have.value','')
		
		cy.get('#phone')
		.type('21988018632')
		.should('have.value','21988018632')
		.clear()
		.should('have.value','')		
	})
	it('Crie mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
		cy.get('button[type="submit"]').click();
		cy.get('.error').should('exist');
	})
	it('Envia um formulário usando um comando custumizado', function(){
		cy.fillMandatoryFieldAndsubmit()
		cy.get('.success').should('exist');
	})
})