const el = require('./elements').ELEMENTS;

class Profile{
    clicarNoBotaoLogout(){
        cy.get(el.buttonLogout).click();
    }

    clicarNoBotaoCadastrarNovosCasos(){
        cy.get(el.buttonNewIncident).click();
    }

    clicarNoBotaoDeExcluirUmCaso(){
        
        // Delete 204
        // http://localhost:3333/incidents/41
        cy.route('DELETE', '**/incidents/*').as('deleteIncident');

        cy.get(el.buttonDelete).click();
    }

    validarExclusaoDeCasoComSucesso(){
        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            // Por ser uma requisção de DELETE não vamos esperar por nada 
            expect(xhr.response.body).to.be.empty;
        });
    }
}

export default new Profile();