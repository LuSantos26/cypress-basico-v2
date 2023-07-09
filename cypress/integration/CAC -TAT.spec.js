///<reference types="Cypress"/>



describe('verificar o título da aplicação', function() {
	const THREE_SECONDS_IN_MS = 3000
	beforeEach(function() {
		cy.visit('src/index.html')

	})

	it('Deve visitar uma página e verificar o título', function() {
		cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
	})
	it('preenche os campos obrigatórios e envia o formulário', function() {
		const longText = 'Maria, const const const constv constv const const constvv const';

		cy.clock()

		cy.get('#firstName').type('Luana');
		cy.get('#lastName').type('Gomez');
		cy.get('#email').type('jobupa@getnada.com');
		cy.get('#phone').type('21988018632');
		cy.get('#open-text-area').type(longText, { delay: 0 });
		cy.contains('button', 'Enviar').click();
		cy.get('.success').should('be.visible');

		cy.tick(THREE_SECONDS_IN_MS)
		cy.get('.success').should('not.be.visible');
	})
	it('Exibe mensagem de erro ao submeter o formulário com um email com formatação invavlida', function() {
		cy.clock()
		cy.get('#firstName').type('Luana');
		cy.get('#lastName').type('Gomez');
		cy.get('#email').type('jobupa.getnada.com');
		cy.get('#phone').type('21988018632');
		cy.get('#open-text-area').type('Teste');
		cy.contains('button', 'Enviar').click();
		cy.get('.error').should('be.visible');

		cy.tick(THREE_SECONDS_IN_MS)
		cy.get('.error').should('not.be.visible');

	})
	it('Campo telefone continua vazio quando preenchido com valor não numérico', function() {
		cy.get('#phone')
			.type('adahkjhdhjfhjdfhjdhf')
			.should('have.value', '')
	})
	it('Campo telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
		cy.clock()
		cy.get('#firstName').type('Luana');
		cy.get('#lastName').type('Gomez');
		cy.get('#email').type('jobupa@getnada.com');
		cy.get('#phone-checkbox').check();
		cy.get('#open-text-area').type('Teste');
		cy.contains('button', 'Enviar').click();
		cy.get('.error').should('be.visible');

		cy.tick(THREE_SECONDS_IN_MS)
		cy.get('.error').should('not.be.visible');

	})
	it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
		cy.get('#firstName')
			.type('Luana')
			.should('have.value', 'Luana')
			.clear()
			.should('have.value', '')

		cy.get('#lastName')
			.type('Gomez')
			.should('have.value', 'Gomez')
			.clear()
			.should('have.value', '')

		cy.get('#email')
			.type('jobupa@getnada.com')
			.should('have.value', 'jobupa@getnada.com')
			.clear()
			.should('have.value', '')

		cy.get('#phone')
			.type('21988018632')
			.should('have.value', '21988018632')
			.clear()
			.should('have.value', '')
	})
	it('Crie mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
		cy.clock()
		cy.get('button[type="submit"]').click();
		cy.get('.error').should('be.visible');

		cy.tick(THREE_SECONDS_IN_MS)
		cy.get('.error').should('not.be.visible');
	})

	it('Envia um formulário com sucesso usando um comando custumizado', function() {
		cy.fillMandatoryFieldAndsubmit()

		cy.clock()
		cy.get('.success').should('be.visible');

		cy.tick(THREE_SECONDS_IN_MS)
		cy.get('.success').should('not.be.visible');
	})

	it('Seleciona um produto (YouTube) por seu texto', function() {
		cy.get('#product')
			.select('YouTube')
			.should('have.value', 'youtube')
	})

	it('Seleciona um produto (Mentoria) por seu valor(value)', function() {
		cy.get('#product')
			.select('mentoria')
			.should('have.value', 'mentoria')
	})

	it('Seleciona um produto (Blog) por seu índice', function() {
		cy.get('#product')
			.select(1)
			.should('have.value', 'blog')
	})

	it('Marcar o tipo de atendimento "Feedback"', function() {
		cy.get('input[type="radio"][value="feedback"]')
			.check()
			.should('be.checked')
	})

	it('Marca cada tipo de atendimento', function() {
		cy.get('input[type="radio"]')
			.should('have.length', 3)
			.each(function($radio) {
				cy.wrap($radio).check()
				cy.wrap($radio).should('be.checked')
			})
	})

	it('Marca ambos checkbox , pois desmarca o último', function() {
		cy.get('input[type="checkbox"]')
			.check()
			.should('be.checked')
			.last()
			.uncheck()
			.should('not.be.checked')
	})
	it('Seleciona um arquivo da pasta fixtures', function() {
		cy.get('#file-upload')
			.should('not.have.value')
			.selectFile('./cypress/fixtures/example.json')
			.should(function($fileUpload) {
				console.log($fileUpload);
				expect($fileUpload[0].files[0].name).to.equal('example.json');
			})

		it('Seleciona um arquivo simulando um drag-and-drop', function() {
			cy.get('#file-upload')
				.should('not.have.value')
				.selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
				.should(function($fileUpload) {
					console.log($fileUpload);
					expect($fileUpload[0].files[0].name).to.equal('example.json');
				})
		})
	})

	it('Seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function() {
		cy.fixture('example.json').as('samplefile')
		cy.get('#file-upload')
			.selectFile('@samplefile')
			.should(function($fileUpload) {
				expect($fileUpload[0].files[0].name).to.equal('example.json');
			})
	})
	it('Verifica que a política de privacidade abre em outra aba sem necessidade de um click', function() {
		cy.get(' a').should('have.attr', 'target', '_blank')
	})
	it('Acessa a página a política de privacidade removendo o target e então clicando no link', function() {
		cy.get(' a')
			.invoke('removeAttr', 'target')
			.click()
		cy.contains('Talking About Testing').should('be.visible')
	})

	it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
		cy.get('.success')
			.should('not.be.visible')
			.invoke('show')
			.should('be.visible')
			.and('contain', 'Mensagem enviada com sucesso.')
			.invoke('hide')
			.should('not.be.visible')
		cy.get('.error')
			.should('not.be.visible')
			.invoke('show')
			.should('be.visible')
			.and('contain', 'Valide os campos obrigatórios!')
			.invoke('hide')
			.should('not.be.visible')
	})
	it(`preenche a area de texto usando o comando invoke`, function() {
		const longText = Cypress._.repeat('0123456789', 20)

		cy.get('textarea')
			.invoke('val', longText)
			.should('have.value', longText)
	})
	it('faz uma requisição HTTP', function() {
		cy.request('`https://cac-tat.s3.eu-central-1.amazonaws.com/index.html`')
			.should(function(response) {
				const { status, statusText, body } = response
				expect(status).to.equal(200)
				expect(statusText).to.equal('OK')
				const expected = '<html>\r\n <head>\r\n <meta http-equiv="content-type" content="text/html;charset=utf-8">\r\n <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n <title>Cypress</title>\r\n\r\n <link href="/__cypress/runner/favicon.ico" rel="icon">\r\n\r\n <link rel="stylesheet" href="/__cypress/runner/cypress_runner.css">\r\n </head>\r\n <body>\r\n <div id="app">\r\n <div class="runner automation-failure">\r\n <div class="automation-message">\r\n <p>Whoops, we can\'t run your tests.</p>\r\n <div>\r\n <p class="muted">This browser was not launched through Cypress. Tests cannot run.</p>\r\n </div>\r\n </div>\r\n </div>\r\n </div>\r\n </body>\r\n</html>\r\n';

				const expectedWithoutSpacesAndEscape = expected.replace(/\s/g, '');

				expect(body.replace(/\s/g, '')).to.include(expectedWithoutSpacesAndEscape);
			})
	})
	it.only('Encontra o gato escondido', function(){
		cy.get('#cat')
		.invoke('show')
		.should('be.visible')
		cy.get('#title')
		.invoke('text','CAT TAT')
	})
})

