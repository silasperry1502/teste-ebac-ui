///<reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
    });
    
    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Aether Gym Pant')
            cy.get('#tab-title-description > a').should('contain','Descrição')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Orestes Fitness Short'
       produtosPage.buscarProduto(produto)
       cy.get('.product_title').should('contain',produto) 
    });

    it('Deve visitar a pagina do produto', () => {
        produtosPage.visitarProduto('Orestes-Fitness-Short')
        cy.get('.product_title').should('contain','Orestes Fitness Short') 
    });

    it('Deve adicionar o produto ao carrinho', () => {
        let qtd = 7
        produtosPage.buscarProduto('Ajax Full-Zip Sweatshirt')
        produtosPage.addProdutoCarrinho('M','Green', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')
        
    });
    it.only('Deve adicionar o produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados =>{
            produtosPage.buscarProduto(dados[1].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[1].tamanhos,
                dados[1].cor,
                dados[1].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
        })
        
        
        
    });
});