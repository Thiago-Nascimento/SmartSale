import React, { Component } from 'react';
// Espaço para Header
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

class Cad_usuario extends Component {

    constructor() {
        super()
        this.state = {

            // Listar - Get
            listarUsu: [],

            // Post
            postUsuario: {
                nomeUsuario: "",
                idade: "",
                documento: "",
                razaoSocial: "",
                email: "",
                fotoUsuario: React.createRef(),
                senha: "",
                telefone: "",
                telefone2: "",
                endereco: "",
                cep: "",
                pontuacao: "0",
                idTipoUsuario: ""
            },
        }
    }
    //#region Ciclo de Vida
    componentDidMount() {
        console.log('CARREGADO');
        console.log(this.listarUsu);
        this.listarGET();
    }
    //#endregion


    //#region GET
    listarGET = () => {

        fetch('http://localhost:5000/api/Usuario/')
            .then(response => response.json())
            .then(data => this.setState({ listarUsu: data }))
            .catch(error => {
                console.log(error)
            })
    }
    //#endregion


    //#region POST

    postSetState = (input) => {
        this.setState({
            postUsuario: {
                ...this.state.postUsuario,
                [input.target.name]: input.target.value
            }
        })
    }

    postUsuario = (e) => {
        e.preventDefault();

        // Declara um objeto do tipo FormData, já que o Backend recebe este tipo.
        let usuario = new FormData();

        // Setamos o idTipoUsuario e atribuimos 2 ou 3

        // Se o documento for = a 14 o usuario é vendedor
        if (this.state.postUsuario.documento.length === 14) {
            usuario.set("idTipoUsuario", "2")

        // Se o documento for = a 11 ele é cliente
        } else if (this.state.postUsuario.documento.length === 11) {
            usuario.set("idTipoUsuario", "3")
        }

        usuario.set('idRegiao', "1");

        usuario.set("nomeUsuario", this.state.postUsuario.nomeUsuario);
        usuario.set('idade', this.state.postUsuario.idade);
        usuario.set('documento', this.state.postUsuario.documento);
        usuario.set('razaoSocial', this.state.postUsuario.razaoSocial);
        usuario.set('email', this.state.postUsuario.email);
        usuario.set('fotoUsuario', this.state.postUsuario.fotoUsuario.current.files[0]);
        usuario.set('senha', this.state.postUsuario.senha);
        usuario.set('telefone', this.state.postUsuario.telefone);
        usuario.set('telefone2', this.state.postUsuario.telefone2);
        usuario.set('endereco', this.state.postUsuario.endereco);
        usuario.set('cep', this.state.postUsuario.cep);
        usuario.set('pontuacao', this.state.postUsuario.pontuacao);

        console.log(usuario);

        fetch('http://localhost:5000/api/Usuario', {
            method: "POST",
            body: usuario,
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listarGET();
            })
            .catch(error => console.log('Não foi possível cadastrar:' + error))
    }

    // handleImageChange = (e) => {
    //     this.setState({
    //         fotoUsuario: e.target.files[0]
    //     })
    // };


    //#endregion

    render() {
        return (
            <div className="Cad_usuario">
                <Header {...this.props}/>
                <main>
                    <div className="fundoCadastro">
                        <section className="card_cadastro">
                            <h2>CADASTRE-SE</h2>
                            <div className="descricao">
                                <p>Cadastre-se para poder efetuar reservas em nossa aplicação e aproveitar as ofertas.</p>
                            </div>

                            <form onSubmit={this.postUsuario}>
                                <div className="campo_cadastrousuario">
                                    <input
                                        type="text"
                                        placeholder="Nome completo"
                                        aria-label="Digite o nome completo"
                                        name="nomeUsuario"
                                        required
                                        value={this.state.postUsuario.nomeUsuario}
                                        onChange={this.postSetState}
                                    />
                                </div>
                                <div className="campo_cadastrousuario">
                                    <input
                                        type="text"
                                        placeholder="Idade"
                                        aria-label="Digite sua idade"
                                        name="idade"
                                        required
                                        value={this.state.postUsuario.idade}
                                        onChange={this.postSetState}
                                    />
                                    </div>
                                    <div className="campo_cadastrousuario">
                                        <input
                                            type="text"
                                            placeholder="CPF ou CNPJ"
                                            aria-label="Digite seu CPF ou CNPJ"
                                            name="documento"
                                            required
                                            value={this.state.postUsuario.documento}
                                            onChange={this.postSetState}
                                        />
                                    </div>
                                    <div className="campo_cadastrousuario">
                                        <input
                                            type="text"
                                            placeholder="Razao Social"
                                            aria-label="Razão Social"
                                            name="razaoSocial"
                                            required
                                            value={this.state.postUsuario.razaoSocial}
                                            onChange={this.postSetState}
                                        />
                                    </div>
                                    <div className="campo_cadastrousuario">
                                        <input
                                            type="email"
                                            placeholder="E-mail"
                                            aria-label="Digite seu e-mail"
                                            name="email"
                                            required
                                            value={this.state.postUsuario.email}
                                            onChange={this.postSetState}
                                        />
                                    </div>
                                    <div className="campo_cadastrousuario">
                                        <input
                                            type="password"
                                            placeholder="Senha"
                                            aria-label="Digite sua senha"
                                            name="senha"
                                            required
                                            value={this.state.postUsuario.senha}
                                            onChange={this.postSetState}
                                        />
                                    </div>
                                <div className="campo_cadastrousuario">
                                    <input
                                        type="text"
                                        placeholder="Telefone"
                                        aria-label="Digite seu telefone"
                                        name="telefone"
                                        required
                                        value={this.state.postUsuario.telefone}
                                        onChange={this.postSetState}
                                    />
                                </div>
                                <div className="campo_cadastrousuario">
                                    <input
                                        type="text"
                                        placeholder="Telefone2"
                                        aria-label="Digite uma segunda opção de Telefone"
                                        name="telefone2"
                                        value={this.state.postUsuario.telefone2}
                                        onChange={this.postSetState}
                                    />
                                </div>
                                <div className="campo_cadastrousuario">
                                    <input
                                        type="text"
                                        placeholder="Endereço"
                                        aria-label="Digite seu endereço"
                                        name="endereco"
                                        required
                                        value={this.state.postUsuario.endereco}
                                        onChange={this.postSetState}
                                    />
                                </div>
                                <div className="campo_cadastrousuario">
                                    <input
                                        type="text"
                                        placeholder="CEP"
                                        aria-label="Digite seu CEP"
                                        name="cep"
                                        value={this.state.postUsuario.cep}
                                        onChange={this.postSetState}
                                    />
                                </div>
                                <div className="campo_cadastrousuario">
                                    <input
                                        type="file"
                                        placeholder="Coloque uma foto sua"
                                        aria-label="Coloque uma foto sua"
                                        name="fotoUsuario"
                                        // value={this.state.postUsuario.fotoUsuario}
                                        // onChange={this.imgSetState}
                                        ref={this.state.postUsuario.fotoUsuario}

                                    />
                                </div>
                                <div className="btn_cadlog">
                                    <button
                                        type="submit"
                                    >CADASTRAR</button>
                                </div>
                            </form>
                        </section>

                    </div>

                </main>
                <Footer/>
            </div >
        );
    }
}
export default Cad_usuario;