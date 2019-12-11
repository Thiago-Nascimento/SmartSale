import React, { Component } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

class Produto extends Component {
    constructor() {
        super();

        this.state = {
            produto: {
                idOferta: "",
                titulo: "",
                foto: "",
                preco: "",
                regiao: "",
                quantDisponivel: "",
            },
            reserva: {
                quantidadeComprada: "",
                valorFinal: "",
                dataLimiteRetirada: "",
                idUsuario: "",
                idOferta: ""
            }
            
        }        
    }
    
    componentDidMount(){
        console.log("Minhas props PRODUTO: ", this.props);
        console.log("Produto: ", this.props.location.idOferta)
        this.getProduto();
    }

    getProduto = () => {
        fetch("http://localhost:5000/api/oferta/" + this.props.location.idOferta)
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
                }    
            })
            console.log("DATA: ", data);
            console.log("States: ", this.state.produto);
        });
    }

    adicionaDiasHj = (dias) => {
        var result = new Date();
        result.setDate(result.getDate() + dias);
        return result.toISOString().split("T")[0];
    }

    setReserva = () => {
        this.setState({
            reserva : {
                valorFinal: this.state.reserva.quantidadeComprada * this.state.produto.preco,
                dataLimiteRetirada: this.adicionaDiasHj(3),
                idUsuario: "1",
                idOferta: this.state.produto.idOferta
            }
        })
    }

    reservar = (event) => {
        event.preventDefault();
        
        console.log(this.state.reserva)
        
        fetch("http://localhost:5000/api/reserva", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(this.state.reserva)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.props.history.push({
                pathname:"/finalreserva",
                state : {
                    reserva: this.state.reserva
                }
            })
        })
        .catch(error => console.log(error))
    }

    atualizaEstado = (input) => {
        // this.setState({
        //     reserva : {
        //         ...this.state.reserva,
        //         [input.target.name]: input.target.value
        //     }
            this.setState({
                reserva : {
                    quantidadeComprada: input.target.value,
                    valorFinal: this.state.reserva.quantidadeComprada * this.state.produto.preco,
                    dataLimiteRetirada: this.adicionaDiasHj(3),
                    idUsuario: "1",
                    idOferta: this.state.produto.idOferta
                }
            })
        // })
    }

    render() {
        return(
            <div>
                <Header {...this.props}/>
                <div className="paginaProduto_pag">
                    <div className="container">
                        <section className="produto">
                            <div className="esquerdo">
                                <div>
                                    <img src={"http://localhost:5000/" + this.state.produto.foto} alt="Imagem do Produto" className="imagem-produto"/>
                                </div>
                            </div>
                            <div className="direito">
                                <div className="informacoes_produto">
                                    <p className="nomeProduto">{this.state.produto.titulo}</p>
                                    <p className="precoProduto">{"R$" + this.state.produto.preco}</p>
                                    <b><p id="regiao">{this.state.produto.regiao}</p></b>
                                </div>
                                <div className="contQuantBotoes">
                                    <p className="quantDisponivel">Quantidade Disponível: {this.state.produto.quantDisponivel}</p>
                                    <p className="precoTotal">Preço Total: {this.state.produto.preco * this.state.reserva.quantidadeComprada}</p>
                                    <form onSubmit={this.reservar}>
                                        <div className="quantidade">
                                            <label>Quantidade</label>
                                            <input type="number" min="1" max={this.state.produto.quantDisponivel} name="quantidadeComprada" value={this.state.reserva.quantidadeComprada} onChange={this.atualizaEstado}/>
                                        </div>
                                        <div className="botoes">
                                            <button type="submit" className="botaoReservar">Reservar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                        <section className="outrosProdutos">
                            <p className="relacionados">Outros Produtos</p>
                            <div className="produtos">
                            </div>
                        </section>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Produto;