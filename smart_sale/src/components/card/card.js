import React, { Component } from 'react';

class Card extends Component {

    constructor() {
        super();
        this.state = {
            informacoesProduto: [],

        }
    }

    // Fez
    componentDidMount() {
        this.getInformacoes();
    }

    // GET
    getInformacoes = () => {

        fetch('http://localhost:5000/api/Oferta')
            .then(response => response.json())
            .then(data =>
                this.setState({ informacoesProduto: data }))
            .catch(error => { console.log(`Ocorreu um erro: ${error}`) })

    }


    render() {
        return (
            <div className="Card_ofertas">
                {
                    this.state.informacoesProduto.map(
                        function (oferta) {
                            return (
                                <div className="Card_oferta_geral">
                                    <div key={oferta.idOferta} className="Card_Oferta" >
                                        <div className="img_card_oferta">
                                            <img src={"http://localhost:5000/" + oferta.foto} className="imagem_oferta" alt="Imagem do Produto" />
                                        </div>
                                        <div className="informacoes_card_oferta">
                                            <p id="titulo_card">{oferta.titulo}</p>
                                            <p>R${oferta.preco}</p>
                                            <p>Quantidade{oferta.quantidade}</p>
                                            <p>Local: {oferta.idUsuarioNavigation.idRegiaoNavigation.bairro}</p>
                                            <div className="botao_card_oferta">
                                            <a>Reserve</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )
                }
            </div>
        );
    }
}
export default Card;