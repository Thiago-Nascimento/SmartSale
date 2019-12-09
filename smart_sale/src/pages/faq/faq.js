import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

function Faq() {
    return (
        <div className="Faq">
            <Header {...this.props} />
            <main>
                <div className="faq_pag">
                    <div className="bannerFaq">
                        <h1>Perguntas Frequentes</h1>
                    </div>
                    <div className="container">
                        <div className="container1_perguntasfrequentes">
                            <div className="texto_perguntasfrequentes">

                                <h2>Como compra o produto?</h2>
                                <p>Ao escolher o produto que você queira obter, clique no botão para fazer a reserva, assim, ao
                                     dirigir-se ao vendedor e pagar pelo produto, você o terá obtido.
                                </p>

                                <h2>Como vender minha mercadoria?</h2>
                                <p>Para anunciar seus produtos, faça um cadastro de vendedor (CNPJ é necessário) e anuncie seus
                                    produtos. Você também pode optar por encaminhar seu produto para doação se não for vendido
                                    em determinado tempo ou encaminhar diretamente a alguma ONG na região.</p>

                                <h2>Como o produto chega até mim?</h2>
                                <p>Primeiro, você terá que escolher um produto e efetuar a reserva, clicando no botão
                                    "Reservar". Então, você deverá retirar seu produto com o vendedor e efetuar seu pagamento
                                    até a data estipulada na reserva.
                                    </p>

                                <h2>Onde vejo os produtos que fiz reserva?</h2>
                                <p>Para consultar os produtos já reservados por você, dê uma olhada em seu perfil, localizado no
                                    menu superior da página (é necessário estar logado), na seção de "Produtos reservados".
                                    </p>

                                <h2>Como funciona o ranking?</h2>
                                <p>Você entra no ranking como cliente efetuando compras dos produtos que tem pontos, e entra
                                    como vendedor se você doa algum produto, imediatamente no cadastro ou não.</p>

                                <h2>Como comprar mais de um produto?</h2>
                                <p>Você precisa efetuar a reserva de um produto por vez, uma vez que não trabalhamos com um
                                    carrinho de compras. Sendo assim, ao escolher um produto e efetuar a reserva, você pode
                                    conferir outras ofertas que desejar.</p>
                                <h2>Preciso fazer login para ver as ofertas?</h2>
                                <p>Nesta aplicação não é necessário efetuar login ou cadastro, apenas se você quiser reservar um
                                    produto.</p>

                                <h2>Quais são as ONGs beneficiadas pela aplicação?</h2>
                                <p>Você pode conferir as ONGs beneficiadas na página ONGs, localizada no menu superior da
                                    página.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
export default Faq;