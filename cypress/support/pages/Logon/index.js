// Aqui fica contido as ações de interações com a página

    // ações
    // Acessar o login
    // Preencher o login

// Estamos dizendo que requeremos o conteudo de tal arquivo em especifico a constante x; 
const el = require('./elements').ELEMENTS;

class Logon {
    // Método
    acessarLogin(){
        cy.visit('http://localhost:3000/');
    }

    preencherLogin(){
        cy.get(el.id).type(Cypress.env('createdOngId'));
        cy.get(el.buttonLogin).click();
    }
}

export default new Logon();