import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import foto_perfil from '../../assets/img/perfil.png'
import { parseJwt } from '../../services/auth';

class Perfil extends Component {

    constructor() {
        super();
        this.state = {

            dados: [],
            ofertas: []
        }
    }

    componentDidMount() {
        this.getDados();
        this.getOfertas();
    }

    getDados = () => {

        // Variavel que pega o token que esta armazena no localStorage, usamos o split para mostrar a parte do header, sendo o indice 1
        var header = localStorage.getItem("user-smartsale").split('.')[1]

        // Definimos uma variavel que mostra o atributo ID
        var id = parseJwt().Id

        fetch('http://localhost:5000/api/Usuario/' + id)
            .then(response => response.json())
            .then(response => this.setState({ dados: response }))
            .catch(error => console.log(error))
    }

    filtrar = (value) => {
        return value.idUsuario == parseJwt().Id

    }

    getOfertas = () => {
        var header = localStorage.getItem("user-smartsale").split('.')[1]

        var id = parseJwt().Id

        fetch("http://localhost:5000/api/oferta")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    ofertas: data.filter(this.filtrar)

                })
            })
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <div className="perfil_pag">
                    <div className="perfil_banner">
                        {/* <img src="../SmartSale/img/icons/picture.png" alt="Trocar papel de parede" className="perfil_troca" /> */}
                        <h2>{this.state.dados.nomeUsuario}</h2>
                    </div>
                    <div className="cont">
                        <div className="cima">
                            <section className="esquerdo">
                                <img src={"http://localhost:5000/" + this.state.dados.fotoUsuario} alt="foto de perfil do usuario" className="perfil_foto" />
                                <div className="textos">
                                    <h4>Dados pessoais</h4>
                                    <p>Endereco: {this.state.dados.endereco}</p>
                                </div>
                                <div className="textos">
                                    <h4>Contato</h4>
                                    <p>E-mail: {this.state.dados.email}</p>
                                    <p>celular: {this.state.dados.telefone}</p>
                                    {
                                        this.state.dados.telefone2 != null ? (<p>Telefone : {this.state.dados.telefone2}</p>) : (
                                            null
                                        )

                                    }
                                </div>
                                <div className="perfil_placar_rank">
                                    <h4>Pontuação</h4>
                                    <div className="perfil_rank">
                                        <p>{this.state.dados.pontuacao}</p>
                                    </div>
                                </div>
                                <div className="perfil_button_padding">
                                    <div className="perfil_btn_produto">
                                        <p><Link to="/cadastrooferta" className="perfil_btn-medium">Cadastrar um oferta</Link></p>
                                    </div>
                                </div>
                            </section>
                            <section className="direito">
                                <div className="direito-cards-h3">
                                    <h3>Suas Ofertas</h3>
                                </div>
                                <div>
                                    {/* <Card oferta={this.state.dados.oferta} /> */}
                                    <div className="perfil_btn_produto">
                                        <p><Link to="/ofertas" className="perfil_btn-medium">Ver mais</Link></p>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="baixo">
                            <section className="centro">

                            </section>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Perfil;