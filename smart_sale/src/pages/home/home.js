import React, { Component } from 'react';
//Header
import Footer from './../../components/footer/footer';
import img5 from './../../assets/img/img5.png';
import produto from './../../assets/img/pdts/6.png';


class Home extends Component {

    constructor() {
        super()
        this.state = {

            titulo_categorias: [],
            usuario: [],
            ongs: [],
            oferta: [],

        }
    }

    componentDidMount() {
        this.getCategorias();
        this.getUsuarios();
        this.getOngs();
        this.getOfertas();
        this.coisas();
    }

    //#region GET
    getCategorias = () => {
        fetch('http://localhost:5000/api/Categoria')
            .then(response => response.json())
            .then(response => this.setState({ titulo_categorias: response }))
    }

    getUsuarios = () => {
        fetch('http://localhost:5000/api/Usuario/')
            .then(response => response.json())
            .then(response => {
                var order = response.sort(
                    function (a, b) {
                        return b.pontuacao - a.pontuacao
                    }
                )
                // Usado para fatiar a resposta, percorrendo os 3 primeiros colocados
                var redux = order.slice(0, 3)

                this.setState({ usuario: redux })
            }
            )
    }

    getOngs = () => {

        fetch('http://localhost:5000/api/Ong/')
            .then(response => response.json())
            .then(response => this.setState({ ongs: response }))
    }

    getOfertas = () => {

        fetch('http://localhost:5000/api/Oferta')
            .then(response => response.json())
            .then(response => this.setState({ oferta: response }))

    }
    //#endregion

    calculodata = () => {
        var data = new Date();

    
    }

    render() {
        return (
            <div className="Home">
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
                            <h3 id="produtos_titulo">Produtos </h3>
                            <div className="container">
                                <div className="agora_vai">
                                    <div className="Produtos_home">
                                        {
                                            this.state.oferta.map(
                                                function (mostrar) {
                                                    return (
                                                        <div className="produtos_home">
                                                            <div className="imagem_produtos_home">
                                                                <img src={'http://localhost:5000/' + mostrar.foto} />
                                                            </div>
                                                            <p>{mostrar.titulo} - R${mostrar.preco}</p>
                                                            <p>{mostrar.idUsuarioNavigation.nomeUsuario}</p>
                                                            {/* <p>{ ((mostrar.)) }</p> */}
                                                        </div>
                                                    );
                                                }
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container" id="white">
                            <h3>Categorias</h3>
                            <div className="categorias_home">
                                <section className="cardhome">
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
                                </section>
                            </div>
                            <div className="ver">
                                <a href="./filtroProdutos.html">Ver mais</a>
                            </div>
                        </div>
                        <div className="roxo">
                            <div className="container">
                                <section className="rank">
                                    <p>RANKING</p>
                                    <div className="branco">
                                        {
                                            this.state.usuario.map(
                                                function (dados) {
                                                    return (
                                                        <div className="Usuarios">
                                                            <p>{dados.nomeUsuario} - {dados.pontuacao}</p>
                                                        </div>
                                                    );
                                                }
                                            )
                                        }
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