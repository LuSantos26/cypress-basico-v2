it('Testa a página a política de privacidade de forma independente', function(){
		cy.visit('./src/PRIVACY.html')
		cy.contains('Talking About Testing').should('be.visible')
	})