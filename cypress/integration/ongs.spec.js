/// <reference types="Cypress" />

import Logon from '../support/pages/Logon';
import Register from '../support/pages/Register';
import Profile from '../support/pages/Profile';
import NewIncident from '../support/pages/NewIncident';

describe('Ongs', () => {

    it('devem poder realizar um cadastro', () => {
        Register.acessarCadastro();
        Register.preencherCadastro();
        Register.validarCadastroDeOngComSucesso();

    });

    it('deve poder realizar um login no sistema', () => {
        Logon.acessarLogin();
        Logon.preencherLogin();
    });

    it('deve poder realizar um logout', () => {
        cy.login();

        Profile.clicarNoBotaoLogout();
    });

    it('devem poder cadastrar novos casos', () => {
        cy.login();

        Profile.clicarNoBotaoCadastrarNovosCasos();
        NewIncident.preencherCadastroDeCaso();
        NewIncident.validarCadastroDeCaso();
    });

    it('deve poder excluir um caso', () => {
        cy.createdNewIncident();
        cy.login();

        Profile.clicarNoBotaoDeExcluirUmCaso();
        Profile.validarExclusaoDeCasoComSucesso();

    });
});

// ee94928d
