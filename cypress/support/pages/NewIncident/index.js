const el = require('./elements').ELEMENTS;

class NewIncident {
    preencherCadastroDeCaso(){
        cy.get(el.title).type('Animal doente');
        cy.get(el.description).type('Animal precisa de apoio');
        cy.get(el.value).type(300);

        cy.route('POST', '**/incidents').as('newIncident');

        cy.get(el.buttonSave).click();
    }

    validarCadastroDeCaso(){
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;

        });
    }
}

export default new NewIncident();