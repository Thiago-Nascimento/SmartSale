import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idOferta : ""
        }
    }

    render() {
        return (
            <div className="Card_ofertas">
                <div className="Card_oferta_geral">
                    <div key={this.props.idOferta} className="Card_Oferta" >
                        <div className="img_card_oferta">
                            <img src={"http://localhost:5000/" + this.props.foto} className="imagem_oferta" alt="Imagem do Produto" />
                        </div>
                        <div className="informacoes_card_oferta">
                            <p id="titulo_card">{this.props.titulo}</p>
                            <p>R$ {this.props.preco}</p>
                            <p>Quantidade: {this.props.quantidade}</p>
                            <p>Local: {this.props.bairro}</p>
                            <div className="botao_card_oferta">
                                {/* <a>Reserve</a> */}
                                <Link to={{
                                    pathname : "/produto",
                                    idOferta : this.props.idOferta
                                    }}>Reserve</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        // return (
        //     <div className="Card_ofertas">
        //         {
        //             this.state.informacoesProduto.map(
        //                 function (oferta) {
        //                     return (
        //                         <div className="Card_oferta_geral">
        //                             <div key={oferta.idOferta} className="Card_Oferta" >
        //                                 <div className="img_card_oferta">
        //                                     <img src={"http://localhost:5000/" + oferta.foto} className="imagem_oferta" alt="Imagem do Produto" />
        //                                 </div>
        //                                 <div className="informacoes_card_oferta">
        //                                     <p id="titulo_card">{oferta.titulo}</p>
        //                                     <p>R${oferta.preco}</p>
        //                                     <p>Quantidade{oferta.quantidade}</p>
        //                                     <p>Local: {oferta.idUsuarioNavigation.idRegiaoNavigation.bairro}</p>
        //                                     <div className="botao_card_oferta">
        //                                     <a>Reserve</a>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     );
        //                 }
        //             )
        //         }
        //     </div>
        // );
    }
}
export default Card;