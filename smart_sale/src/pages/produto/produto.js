import React, { Component } from 'react';

class Produto extends Component {
    constructor() {
        super();

        
    }
    
    componentDidMount(){
        console.log("Minhas props PRODUTO: ", this.props);
        console.log("Produto: ", this.props.location.idOferta)
    }

    render() {
        return(
            <div>
                <div class="paginaProduto_pag">
                    <div class="container">
                        <section class="produto">
                            <div class="esquerdo">
                                <div>
                                    <img src="./img/Agrupar 61.jpg" alt="Imagem do Feijão Carioca Tipo 1" class="imagem-produto"/>
                                </div>
                            </div>
                            <div class="direito">
                                <div class="informacoes_produto">
                                    <p class="nomeProduto">Feijão Carioca Tipo 1 - 1Kg</p>
                                    <p class="precoProduto">R$5,00</p>
                                    <b><p id="regiao">Taboão da Serra</p></b>
                                </div>
                                <div class="contQuantBotoes">
                                    <div class="quantidade">
                                        <label>Quantidade</label>
                                        <input type="number" name="quantidade"/>
                                    </div>
                                    <div class="botoes">
                                        <a class="botaoReservar" href="finalDaReserva.html">Reservar</a>
                                        {/* <!-- <a class="botaoComprar" href="#">Comprar</a> --> */}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="outrosProdutos">
                            <p class="relacionados">Produtos Relacionados</p>
                            <div class="produtos">
                                <div class="cardProduto">
                                    <img src="./img/download.jpg" alt="Feijão Codil"/>
                                    <div class="textoCard">
                                        <p>Feijão Codil</p>
                                        <p>R$ 10,00</p>
                                        <p>X Unidades Disponíveis</p>
                                        <p>Campos Elíseos - São Paulo</p>
                                    </div>
                                    <div class="botaoCard">
                                        <a href="paginaProduto.html" class="btn">Reserve</a>
                                    </div>
                                </div>
                                <div class="cardProduto">
                                    <img src="./img/download.jpg" alt="Feijão Codil"/>
                                    <div class="textoCard">
                                        <p>Feijão Codil</p>
                                        <p>R$ 10,00</p>
                                        <p>X Unidades Disponíveis</p>
                                        <p>Campos Elíseos - São Paulo</p>
                                    </div>
                                    <div class="botaoCard">
                                        <a href="paginaProduto.html" class="btn">Reserve</a>
                                    </div>
                                </div>
                                <div class="cardProduto">
                                    <img src="./img/download.jpg" alt="Feijão Codil"/>
                                    <div class="textoCard">
                                        <p>Feijão Codil</p>
                                        <p>R$ 10,00</p>
                                        <p>X Unidades Disponíveis</p>
                                        <p>Campos Elíseos - São Paulo</p>
                                    </div>
                                    <div class="botaoCard">
                                        <a href="paginaProduto.html" class="btn">Reserve</a>
                                    </div>
                                </div>
                                <div class="cardProduto">
                                    <img src="./img/download.jpg" alt="Feijão Codil"/>
                                    <div class="textoCard">
                                        <p>Feijão Codil</p>
                                        <p>R$ 10,00</p>
                                        <p>X Unidades Disponíveis</p>
                                        <p>Campos Elíseos - São Paulo</p>
                                    </div>
                                    <div class="botaoCard">
                                        <a href="paginaProduto.html" class="btn">Reserve</a>
                                    </div>
                                </div>
                                <div class="cardProduto">
                                    <img src="./img/download.jpg" alt="Feijão Codil"/>
                                    <div class="textoCard">
                                        <p>Feijão Codil</p>
                                        <p>R$ 10,00</p>
                                        <p>X Unidades Disponíveis</p>
                                        <p>Campos Elíseos - São Paulo</p>
                                    </div>
                                    <div class="botaoCard">
                                        <a href="paginaProduto.html" class="btn">Reserve</a>
                                    </div>
                                </div>
                                <div class="cardProduto">
                                    <img src="./img/download.jpg" alt="Feijão Codil"/>
                                    <div class="textoCard">
                                        <p>Feijão Codil</p>
                                        <p>R$ 10,00</p>
                                        <p>X Unidades Disponíveis</p>
                                        <p>Campos Elíseos - São Paulo</p>
                                    </div>
                                    <div class="botaoCard">
                                        <a href="paginaProduto.html" class="btn">Reserve</a>
                                    </div>
                                </div>
                                <div class="cardProduto">
                                    <img src="./img/download.jpg" alt="Feijão Codil"/>
                                    <div class="textoCard">
                                        <p>Feijão Codil</p>
                                        <p>R$ 10,00</p>
                                        <p>X Unidades Disponíveis</p>
                                        <p>Campos Elíseos - São Paulo</p>
                                    </div>
                                    <div class="botaoCard">
                                        <a href="paginaProduto.html" class="btn">Reserve</a>
                                    </div>
                                </div>
                                <div class="cardProduto">
                                    <img src="./img/download.jpg" alt="Feijão Codil"/>
                                    <div class="textoCard">
                                        <p>Feijão Codil</p>
                                        <p>R$ 10,00</p>
                                        <p>X Unidades Disponíveis</p>
                                        <p>Campos Elíseos - São Paulo</p>
                                    </div>
                                    <div class="botaoCard">
                                        <a href="paginaProduto.html" class="btn">Reserve</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
export default Produto;