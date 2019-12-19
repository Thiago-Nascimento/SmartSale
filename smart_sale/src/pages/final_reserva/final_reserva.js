import React, { Component } from 'react';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import {Link} from 'react-router-dom';      

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
                vendedor: "",
                descricao: ""
            }
        }
    }
    
    componentDidMount() {
        console.log("Props final_reserva: ", this.props)
        this.getOferta(this.props.location.state.reserva.idOferta)
    }
    
    getOferta = (id) => {
        fetch("http://localhost:5000/api/oferta/" + id)
        .then(response => response.json())
        .then(data => { 
            console.log("DATA: ", data)
            this.setState({
                produto: {
                    idOferta: data.idOferta,
                    titulo: data.titulo,
                    quantDisponivel: data.quantidade,
                    foto: data.foto,
                    preco: data.preco,
                    regiao: data.idUsuarioNavigation.idRegiaoNavigation.bairro,  
                    endereco: data.idUsuarioNavigation.endereco,
                    cep: data.idUsuarioNavigation.cep,
                    telefone: data.idUsuarioNavigation.telefone,
                    vendedor: data.idUsuarioNavigation.nomeUsuario ,
                    descricao: data.descricao                 
                }    
            })
        });
    }

    render() {
        return (
            <div className="Final_Reserva">
                <Header {...this.props}/>
                <main>
                    <div className="finalreserva_pag">
                        <div className="container">
                            <section className="esquerdo">
                                <div className="texto">
                                    <h2>Seu produto foi reservado com sucesso!</h2>
                                </div>
                                <div className="textos2">
                                    <p>Detalhes da Reserva</p>
                                    <p>Data Limite de Retirada: {this.props.location.state.reserva.dataLimiteRetirada}</p>
                                    <p>Quantidade: {this.props.location.state.reserva.quantidadeComprada}</p>
                                    <p>Valor final: R${this.props.location.state.reserva.valorFinal}</p>
                                    <br/>
                                    <p>Vendedor: {this.state.produto.vendedor}</p>
                                    <p>Buscar produto em: {this.state.produto.endereco} CEP: {this.state.produto.cep}</p>
                                    <p>Telefone para Contato: {this.state.produto.telefone}</p>
                                </div>
                                <div className="btncompras">
                                    <Link 
                                    style={{ textDecoration: 'none', color: 'white' }}
                                    to="/ofertas">Outros Produtos
                                    </Link>
                                </div>
                            </section>
                            <section className="direito">
                                <div className="prodnome">
                                    <img src={"http://localhost:5000/" + this.state.produto.foto} alt="Imagem do produto" />
                                    <div className="desc">
                                        <p>Descrição:</p>
                                        <p>{this.state.produto.descricao}</p>
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