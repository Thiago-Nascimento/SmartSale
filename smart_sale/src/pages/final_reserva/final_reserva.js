import React, { Component } from 'react';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

class Final_reserva extends Component {
    constructor(props) {
        super(props)

        this.state = {
            produto : {
                idOferta: "",
                titulo: "",
                quantDisponivel: "",
                foto: "",
                preco: "",
                regiao: "",
                vendedor: ""
            }
        }
    }
    
    componentDidMount() {
        console.log("Props final_reserva: ", this.props)
        this.getOferta(this.props.location.state.reserva.dataLimiteRetirada)
    }
    
    getOferta = (id) => {
        fetch("http://localhost:5000/api/oferta/" + id)
        .then(response => response.json())
        .then(data => { 
            this.setState({
                produto: {
                    idOferta: data.idOferta,
                    titulo: data.titulo,
                    quantDisponivel: data.quantidade,
                    foto: data.foto,
                    preco: data.preco,
                    regiao: data.idUsuarioNavigation.idRegiaoNavigation.bairro  
                    // vendedor: data.idUsuarioNavigation.nomeUsuario                  
                }    
            })
        });
    }

    render() {
        return (
            <div className="Final_Reserva">
                <Header {...this.props}/>
                <main>
                    <div class="finalreserva_pag">
                        <div class="container">
                            <section class="esquerdo">
                                <div class="texto">
                                    <h2>Seu produto foi reservado com sucesso!</h2>
                                </div>
                                <div class="textos2">
                                    <p>Detalhes da Reserva</p>
                                    <p>Data Limite de Retirada: {this.props.location.state.reserva.dataLimiteRetirada}</p>
                                    <p>Quantidade: {this.props.location.state.reserva.quantidadeComprada}</p>
                                    <p>Vendedor: {this.state.produto.}</p>
                                    <p>Valor final: R${this.props.location.state.reserva.valorFinal}</p>
                                </div>
                                <div class="btncompras">
                                    <button>Continue comprando</button>
                                </div>
                            </section>
                            <section class="direito">
                                <div class="prodnome">
                                    <img src="./img/E11-3505-006_zoom1.jpg" alt="Imagem do produto, Tamanco Salto Alto" />
                                    <div class="desc">
                                        <p>Salto Alto tamanho 36</p>
                                        <p>Reservado até 20/12/2019</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }
}
export default Final_reserva;