import React, { Component } from 'react';

class Card extends Component {

    constructor() {
        super();
        this.state = {
            informacoesProduto: [],
        }
    }

    componentDidMount() {
        this.getInformacoes();
    }

    getInformacoes = () => {

        fetch('http://localhost:5000/api/Oferta')
            .then(response => response.json())
            .then(data => 
                this.setState({ informacoesProduto: data }))
            .catch(error => { console.log(`Ocorreu um erro: ${error}`)})
    }

    render() {
        return (
            <div className="Card">
                {
                    this.state.informacoesProduto.map(
                        function (oferta) {
                            return (
                                <div className="Oferta">
                                    <img src={"http://localhost:5000/" + oferta.foto} className="imagem_oferta" alt="Imagem do Produto" />
                                    <p>{oferta.titulo}</p>
                                    <p>{oferta.preco}</p>
                                    <p>{oferta.quantidade}</p>
                                    <p>{oferta.idUsuario.idRegiao}</p>
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