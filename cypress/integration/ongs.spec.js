/// <reference types="Cypress" />


describe('Ongs', () => {

    
    it('devem poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register')
        // cy.get - busca um elemento
        // .type - insete um texto 
        cy.get('[data-cy=name]').type('Dogs queridos');
        cy.get('[data-cy=email]').type('dogs@gmail.com');
        cy.get('[data-cy=whatsapp]').type('83991285547');
        cy.get('[data-cy=city]').type('Patos');
        cy.get('[data-cy=uf]').type('PB');

        // routing 
        // 1º etapa: start server com cy.server()
        // 2º etapa: criar uma rota com cy.route()
        // 3º etapa: atribuir uma rota a um alias
        // 4º etapa: esperar a rota com cy.wait()
        // 5º etapa: esperar com cy.wait e fazer uma validação

        // cy.server();
        cy.route('POST', '**/ongs').as('postOng')

        cy.get('[data-cy=submit]').click();

        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    });

    it('deve poder realizar um login no sistema', () => {

        // O cypress não recomenda a utilização de const ou let
        // const createOngId = Cypress.env('createdOngId');

        // cy.log(createOngId);

        cy.visit('http://localhost:3000/');
        cy.get('[data-cy=id]').type(Cypress.env('createdOngId'));
        cy.get('[data-cy=button-login]').click();
    });

    it('deve poder realizar um logout', () => {
        cy.login();
        cy.get('[data-cy=button-logout]').click();
    });

    it('devem poder cadastrar novos casos', () => {
        cy.login();

        cy.get('[data-cy=button-new-incident]').click();

        cy.get('[data-cy=title]').type('Animal doente');
        cy.get('[data-cy=description]').type('Animal precisa de apoio');
        cy.get('[data-cy=value]').type(300);

        cy.route('POST', '**/incidents').as('newIncident');

        cy.get('[data-cy="button-save"]').click();

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;

        })
    });

    it('deve poder excluir um caso', () => {
        cy.createdNewIncident();
        cy.login();

        // Delete 204
        // http://localhost:3333/incidents/41
        cy.route('DELETE', '**/incidents/*').as('deleteIncident');

        cy.get('[data-cy=button-delete]').click();

        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            // Por ser uma requisção de DELETE não vamos esperar por nada 
            expect(xhr.response.body).to.be.empty;
        })
    });


});

// ee94928d
