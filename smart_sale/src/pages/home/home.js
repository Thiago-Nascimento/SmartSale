import React, { Component } from 'react';

import Header from '../../components/header/header';
import Footer from './../../components/footer/footer';
import Card from '../../components/card/card'

// Importada imagem da mãe com a criança
import img5 from './../../assets/img/img5.png'

// Importada imagem de um produtp
import produto from './../../assets/img/pdts/6.png'

// Importadas coroas do ranking
import coroa_ouro from '../../assets/img/icons/crown.png'
import coroa_prata from '../../assets/img/icons/crown-1.png'
import coroa_bronze from '../../assets/img/icons/crown-2.png'

// Importadas imagens das categorias
import verdura from '../../assets/img/verduras.jpeg'
import fruta from '../../assets/img/frutas.jpg'
import legume from '../../assets/img/legume.jpg'
import cereais from '../../assets/img/cereais.jpg'


class Home extends Component {

    constructor() {
        super()
        this.state = {

            titulo_categorias: [],
            usuario_1: [],
            usuario_2: [],
            usuario_3: [],
            ongs: [],
            oferta: [],

        }
    }

    componentDidMount() {
        this.getCategorias();
        this.getUsuario_1();
        this.getUsuario_2();
        this.getUsuario_3();
        this.getOngs();
        this.getOfertas();
        this.calculodata();
    }

    //#region GET
    getCategorias = () => {
        fetch('http://localhost:5000/api/Categoria')
            .then(response => response.json())
            .then(response => {
                var redux = response.slice(0, 4)

                this.setState({ titulo_categorias: redux })
            })

    }

    getUsuario_1 = () => {
        fetch('http://localhost:5000/api/Usuario/')
            .then(response => response.json())
            .then(response => {
                var order = response.sort(
                    function (a, b) {
                        return b.pontuacao - a.pontuacao
                    }
                )
                // Usado para fatiar a resposta, percorrendo os 3 primeiros colocados
                var redux = order.slice(0, 1)
                this.setState({ usuario_1: redux })
            }
            )
    }
    getUsuario_2 = () => {
        fetch('http://localhost:5000/api/Usuario/')
            .then(response => response.json())
            .then(response => {
                var order = response.sort(
                    function (a, b) {
                        return b.pontuacao - a.pontuacao
                    }
                )
                // Usado para fatiar a resposta, percorrendo os 3 primeiros colocados
                var redux = order.slice(1, 2)


                this.setState({ usuario_2: redux })
            }
            )
    }
    getUsuario_3 = () => {
        fetch('http://localhost:5000/api/Usuario/')
            .then(response => response.json())
            .then(response => {
                var order = response.sort(
                    function (a, b) {
                        return b.pontuacao - a.pontuacao
                    }
                )
                // Usado para fatiar a resposta, percorrendo os 3 primeiros colocados
                var redux = order.slice(2, 3)

                this.setState({ usuario_3: redux })
            }
            )
    }



    getOngs = () => {

        fetch('http://localhost:5000/api/Ong/')
            .then(response => response.json())
            .then(response => {
                var redux = response.slice(0,4)
                this.setState({ ongs: redux })
            })
    }

    getOfertas = () => {

        fetch('http://localhost:5000/api/Oferta')
            .then(response => response.json())
            .then(response => this.setState({ oferta: response }))

    }
    //#endregion

    calculodata = () => {



    }

    render() {
        return (
            <div className="Home">
                <Header {...this.props} />
                <main>
                    <div className="home_pag">
                        <div className="banner-home"></div>
                        <div className="container>">
                            <div className="meio-home">
                                <div className="whitebox">
                                    <div className="cnjt">
                                        <div>
                                            <img src={img5} alt="Mãe cozinhando com a filha pequena" className="img-1" />
                                        </div>
                                        <section className="txthome">
                                            <h3>Bem vindo (a) à Smart Sale!</h3>
                                            <p>
                                                Aqui você poderá efetuar compras de produtos mais baratos e ainda evitar desperdício por baixa movimentação de estoque. Para começar, você pode olhar as ofertas dos anunciantes e, se tiver interesse, efetuar a reserva da mesma e retirar com o vendedor. Filtre por região, faça a busca por um produto específico de seu interesse ou opte pelos produtos com vencimento mais próximo.
                                            </p>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pdt">
                            <h3 id="produtos_titulo">Ofertas</h3>
                            <div className="container">
                                <div className="produtos_home">
                                    <div className="Produtos_home">
                                        <Card/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container" id="white">
                            <h3>Categorias</h3>
                            <div className="categorias_home">
                                <section className="cardhome">
                                    <div className="titulos_categorias_home">
                                        {
                                            this.state.titulo_categorias.map(
                                                function (mostrar) {
                                                    return (
                                                        <div>
                                                            <h3>{mostrar.nomeCategoria}</h3>
                                                        </div>
                                                    );
                                                }

                                            )
                                        }
                                    </div>
                                    <div className="imagem_categorias_home">
                                        <img src={verdura} alt="Foto da Categoria Verdura" />
                                        <img src={fruta} />
                                        <img src={legume} />
                                        <img src={cereais} />
                                    </div>
                                </section>
                            </div>
                            <div className="ver">
                                <a href="#">Ver mais</a>
                            </div>
                        </div>
                        <div className="roxo">
                            <div className="container">
                                <section className="rank">
                                    <p>RANKING</p>
                                    <div className="branco">
                                        <div className="primeiros_home">
                                            {
                                                this.state.usuario_1.map(
                                                    function (dados) {
                                                        return (
                                                            <div className="Usuarios">
                                                                <img src={coroa_ouro} alt="Coroa de ouro" id="imagem_ranking_home" />
                                                                <p>{dados.nomeUsuario} - {dados.pontuacao}</p>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            }
                                            {
                                                this.state.usuario_2.map(
                                                    function (dados) {
                                                        return (
                                                            <div className="Usuarios">
                                                                <img src={coroa_prata} alt="Coroa de prata" id="imagem_ranking_home" />
                                                                <p>{dados.nomeUsuario} - {dados.pontuacao}</p>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            }
                                            {
                                                this.state.usuario_3.map(
                                                    function (dados) {
                                                        return (
                                                            <div className="Usuarios">
                                                                <img src={coroa_bronze} alt="Coroa de bronze" id="imagem_ranking_home" />
                                                                <p>{dados.nomeUsuario} - {dados.pontuacao}</p>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            }
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <section className="container">
                            <section className="tongs">
                                <h4>Instituições beneficiadas</h4>
                            </section>
                            <div className="ongs">
                                {
                                    this.state.ongs.map(
                                        function (instituições) {
                                            return (
                                                <div>
                                                    <img src={'http://localhost:5000/' + instituições.fotoOng} alt="Ongs beneficiadas" id="fotos_ongs_home" />
                                                </div>
                                            );
                                        }
                                    )
                                }
                            </div>
                        </section>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
export default Home;