const el = require('./elements').ELEMENTS;

class Register{
    acessarCadastro(){
        cy.visit('http://localhost:3000/register');
    }

    preencherCadastro(){
         // routing 
        // 1º etapa: start server com cy.server()
        // 2º etapa: criar uma rota com cy.route()
        // 3º etapa: atribuir uma rota a um alias
        // 4º etapa: esperar a rota com cy.wait()
        // 5º etapa: esperar com cy.wait e fazer uma validação

        // cy.get - busca um elemento
        // .type - insete um texto 

        cy.get(el.name).type('Dogs queridos');
        cy.get(el.email).type('dogs@gmail.com');
        cy.get(el.whatsapp).type('83991285547');
        cy.get(el.city).type('Patos');
        cy.get(el.uf).type('PB');

        cy.route('POST', '**/ongs').as('postOng')
        cy.get(el.submit).click();
    }

    validarCadastroDeOngComSucesso(){
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    }
}

export default new Register();