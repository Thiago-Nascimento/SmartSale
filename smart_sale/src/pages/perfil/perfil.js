import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { parseJwt } from '../../services/auth';
import Card from '../../components/card/card';
import { parse } from 'path';

class Perfil extends Component {

    constructor() {
        super();
        this.state = {

            dados: {
                idUsuario: "",
                nomeUsuario: "",
                idade: "",
                documento: "",
                razaoSocial: "",
                email: "",
                senha: "",
                telefone: "",
                telefone2: "",
                endereco: "",
                cep: "",
                pontuacao: "",
                foto: React.createRef()
            },
            ofertas: [],
            email: parseJwt().email,

            putimg: {
                idUsuario: "",
                nomeUsuario: "",
                idade: "",
                documento: "",
                razaoSocial: "",
                email: "",
                senha: "",
                telefone: "",
                telefone2: "",
                endereco: "",
                cep: "",
                pontuacao: "",
                foto: React.createRef()
            }
        }
    }

    componentDidMount() {
        this.getDados();
        this.getOfertas();
        console.log(parseJwt().Role)
    }

    //#region GETS
    getDados = () => {

        // Variavel que pega o token que esta armazena no localStorage, usamos o split para mostrar a parte do header, sendo o indice 1
        // var header = localStorage.getItem("user-smartsale").split('.')[1]

        // Definimos uma variavel que mostra o atributo ID
        var id = parseJwt().Id

        setTimeout(() => {
            fetch('http://localhost:5000/api/Usuario/' + id)
                .then(response => response.json())
                .then(response => {
                    // this.setState({ dados: response })
                    this.setState({
                        dados: {
                            ...this.state.putimg,
                            idUsuario: response.idUsuario,
                            nomeUsuario: response.nomeUsuario,
                            idade: response.idade,
                            documento: response.documento,
                            razaoSocial: response.razaoSocial,
                            email: response.email,
                            senha: response.senha,
                            telefone: response.telefone,
                            telefone2: response.telefone2,
                            endereco: response.endereco,
                            cep: response.cep,
                            pontuacao: response.pontuacao,
                            foto: response.foto,
                        },

                        putimg: {
                            ...this.state.putimg,
                            idUsuario: this.state.dados.idUsuario,
                            nomeUsuario: this.state.dados.nomeUsuario,
                            idade: this.state.dados.idade,
                            documento: this.state.dados.documento,
                            razaoSocial: this.state.dados.razaoSocial,
                            email: this.state.dados.email,
                            senha: this.state.dados.senha,
                            telefone: this.state.dados.telefone,
                            telefone2: this.state.dados.telefone2,
                            endereco: this.state.dados.endereco,
                            cep: this.state.dados.cep,
                            pontuacao: this.state.dados.pontuacao,
                            foto: this.state.dados.foto
                        }
                    })

                })
                .catch(error => console.log(error))
        }, 100);
    }

    getOfertas = () => {

        var id = parseJwt().Id

        fetch("http://localhost:5000/api/oferta/usuario/" + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ ofertas: data })
            })
    }
    //#endregion

    //#region PUT

    putSetStateFile = (input) => {
        this.setState({
            putimg: {
                ...this.state.putimg,
                [input.target.name]: input.target.files[0]
            }
        })
        console.log(this.state.putimg.fotoUsuario)
    }

    putImagem = (event) => {
        event.preventDefault();
        // let id = this.state.putimg.idUsuario
        let id = parseJwt().Id
        let usuario = new FormData();

        // if (this.state.putimg.fotoUsuario.current !== undefined) {
        //     usuario.set('fotoUsuario', this.state.putimg.fotoUsuario.current.files[0], this.state.putimg.fotoUsuario.value)
        // }

        // console.log(this.state.putimg.fotoUsuario)
        // console.log("Documento: " + this.state.putimg.documento)

        // if (this.state.putimg.documento.length === 14) {
        //     usuario.set("idTipoUsuario", "2")

        //     // Se o documento for = a 11 ele é cliente
        // } else if (this.state.putimg.documento.length === 11) {
        //     usuario.set("idTipoUsuario", "3")
        // }

        // usuario.set("idTipoUsuario", "3");

        // usuario.set('idRegiao', "1");

        // usuario.set("nomeUsuario", this.state.putimg.nomeUsuario);
        // console.log(this.state.putimg.nomeUsuario)
        // usuario.set('idade', this.state.putimg.idade);
        // usuario.set('documento', this.state.putimg.documento);
        // usuario.set('razaoSocial', this.state.putimg.razaoSocial);
        // usuario.set('email', this.state.putimg.email);
        usuario.set('fotoUsuario', this.state.putimg.fotoUsuario.current.files[0]);
        // usuario.set('senha', this.state.putimg.senha);
        // usuario.set('telefone', this.state.putimg.telefone);
        // usuario.set('telefone2', this.state.putimg.telefone2);
        // usuario.set('endereco', this.state.putimg.endereco);
        // usuario.set('cep', this.state.putimg.cep);
        // usuario.set('pontuacao', this.state.putimg.pontuacao);


        fetch('http://localhost:5000/api/Usuario/' + id, {
            method: "PUT",
            body: usuario,
        })
            .then(() => {
                this.setState(console.log("Imagem alterada"))
            })
            .catch(error => {
                console.log("Deu erro: " + error)
            })
    }

    //#endregion

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
                                <img src={"http://localhost:5000/" + this.state.dados.foto} alt="foto de perfil do usuario" className="perfil_foto" />

                                <form onSubmit={this.putImagem}>
                                    <input type="file" onChange={this.putSetStateFile} ref={this.state.putimg.fotoUsuario} name="fotoUsuario" />
                                    <button type="submit">Alterar</button>
                                </form>

                                <div className="textos">
                                    <h4>Dados pessoais</h4>
                                    <p>Endereco: {this.state.dados.endereco}</p>
                                </div>
                                <div className="textos">
                                    <h4>Contato</h4>
                                    <p>E-mail: {this.state.email}</p>
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
                                        {
                                            parseJwt().Role == 1 &&
                                            <div>
                                                <p><Link to="/cadastrocategoria" className="perfil_btn-medium">Manipular categorias</Link></p><br/><br/>    
                                                <p><Link to="/cadastroproduto" className="perfil_btn-medium"><span id="span_">..</span>Manipular produtos</Link></p>
                                            </div>
                                        }
                                        {
                                            parseJwt().Role == 2 &&
                                            <div>
                                                <p><Link to="/cadastrooferta" className="perfil_btn-medium">Cadastrar um oferta</Link></p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </section>
                        <section className="direito">
                            <div className="direito-cards-h3">
                                <h3>Suas Ofertas</h3>
                            </div>
                            <div className="produtos_usuario">
                                {
                                    this.state.ofertas.map(function (oferta) {
                                        return (
                                            <div key={oferta.idOferta}>
                                                <Card idOferta={oferta.idOferta} foto={oferta.foto} titulo={oferta.titulo} preco={oferta.preco} quantidade={oferta.quantidade}
                                                    bairro={oferta.idUsuarioNavigation.idRegiaoNavigation.bairro} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </section>
                    </div>
                    <div className="baixo">
                        <section className="centro">
                            <div className="perfil_btn_produto">
                                <p><Link to="/ofertas" className="perfil_btn-medium">Ver mais</Link></p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
            </div >
        );
    }
}
export default Perfil;