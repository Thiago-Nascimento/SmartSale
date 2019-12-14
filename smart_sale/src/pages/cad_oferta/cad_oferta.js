import React, { Component } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

class Cad_oferta extends Component {

    constructor() {
        super()
        this.state = {

            listarUsu: [],
            listarOngs: [],
            listarProdutos: [],
            checkDoacao: false,
            erroMsg: "",

            //Post
            postOferta: {
                titulo: "",
                quantidade: "",
                cor: "",
                dataValidade: "",
                descricao: "",
                preco: "",
                idProduto: "",
                idUsuario: "",
                foto: React.createRef(),
                doacaoOng: "0",
            },
        }
    }
    componentDidUpdate() {
        console.log("valor do check: " + this.state.postOferta.checkDoacao)
        console.log("ong para doação: " + this.state.postOferta.doacaoOng)
        console.log("Mensagem de erro: " + this.state.erroMsg)
        console.log("Cor: " + this.state.postOferta.cor)
        console.log("------------------------------------------------")
    }

    componentDidMount() {
        console.log("Carregando")
        this.getOngs()
        this.listarGET()
        this.getProdutos()
        console.log("checkbox: " + this.state.postOferta.doacaoOng)
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

        // verificando a resposta do click na checkbox
        console.log("Checkbox is: " + [value])
    }

    //#region GET
    getOngs = () => {
        fetch('http://localhost:5000/api/Ong/')
            .then(response => response.json())
            .then(data => this.setState({ listarOngs: data }))
            .catch(error => {
                console.log(error)
            })
    }

    // get ofertas
    listarGET = () => {

        fetch("http://localhost:5000/api/Oferta")
            .then(response => response.json())
            .then(data => this.setState({ listarOferta: data }))
            .catch(error => {
                console.log(error)
            })
    }

    getProdutos = () => {

        fetch("http://localhost:5000/api/Produto")
            .then(response => response.json())
            .then(response => this.setState({ listarProdutos: response }))
            .catch(erro => console.log(erro))
    }
    //#endregion

    //#region POST
    postSetState = (input) => {
        this.setState({
            postOferta: {
                ...this.state.postOferta,
                [input.target.name]: input.target.value
            }
        })
    }

    postOferta = (e) => {
        e.preventDefault();

        // setei o valor de Id produto para 2 por ser uma chave estrangeira que puxa do produto

        let ofertaForm = new FormData();

        ofertaForm.set("idProduto", "2")
        ofertaForm.set("idUsuario", "2")
        ofertaForm.set("titulo", this.state.postOferta.titulo);
        ofertaForm.set("quantidade", this.state.postOferta.quantidade);
        ofertaForm.set("cor", this.state.postOferta.cor);
        ofertaForm.set("dataValidade", this.state.postOferta.dataValidade);
        ofertaForm.set("preco", this.state.postOferta.preco);
        ofertaForm.set("descricao", this.state.postOferta.descricao);
        ofertaForm.set("fotofile", this.state.postOferta.foto.current.files[0]);
        ofertaForm.set("checkDoacao", this.state.checkDoacao);
        ofertaForm.set("doacaoOng", this.state.postOferta.doacaoOng);
        ofertaForm.set("foto", "asdas");

        console.log("Oferta: ", ofertaForm);

        this.setState({ erroMsg: "" })

        fetch('http://localhost:5000/api/Oferta', {
            method: "POST",
            body: ofertaForm,
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listarGET();
                this.setState({
                    erroMsg: "Cadastro efetuado com sucesso!"
                })
            })
            .catch(error =>
                this.setState({
                    erroMsg: "Não é possível cadastrar. Verifique se não há campos vazios ou com dados incorretos."
                })
            )

    }
    //#endregion

    render() {
        return (
            <div>
                <Header />
                <div className="fundoCadastro">
                    <div className="cardCadastro">
                        <h2>Cadastro de Oferta</h2>
                        <div className="descricao">
                            <p>Preencha os campos abaixo para efetuar o cadastro da sua oferta.</p>
                            <p>Marque a opção de doação se quiser que seu produto seja doado.</p>
                        </div>
                        <form onSubmit={this.postOferta} id="form_cadastro_venda">
                            <div className="campo">

                                <input
                                    type="text"
                                    placeholder="Nome do produto"
                                    aria-label="Digite o nome do produto"
                                    name="titulo"
                                    required
                                    value={this.state.postOferta.titulo}
                                    onChange={this.postSetState}
                                />
                            </div>
                            <div className="campo">
                                <select>
                                    <option value="">Produtos</option>
                                    {
                                        this.state.listarProdutos.map(function (listar) {
                                            return (
                                                <option key={listar.idProduto}>{listar.nomeProduto}</option>
                                            );
                                        }.bind(this))
                                    }
                                </select>
                            </div>

                            <div className="campo">
                                <input
                                    type="text"
                                    placeholder="Quantidade"
                                    aria-label="Digite a quantidade"
                                    name="quantidade"
                                    required
                                    value={this.state.postOferta.quantidade}
                                    onChange={this.postSetState} />
                            </div>

                            <div className="campo">
                                <input
                                    type="text"
                                    placeholder="Cor - Não obrigatório"
                                    aria-label="Digite a cor do produto. Não é obrigatório."
                                    name="cor"
                                    value={this.state.postOferta.cor}
                                    onChange={this.postSetState} />
                            </div>

                            <div className="campo">
                                <input
                                    type="date"
                                    placeholder="Data de validade"
                                    aria-label="Indique a data de validade"
                                    name="dataValidade"
                                    required
                                    value={this.state.postOferta.dataValidade}
                                    onChange={this.postSetState} />
                            </div>

                            <div className="campo">
                                <input
                                    type="text"
                                    placeholder="Descrição do produto"
                                    aria-label="Descrição"
                                    name="descricao"
                                    required
                                    value={this.state.postOferta.descricao}
                                    onChange={this.postSetState} />
                            </div>

                            <div className="campo">
                                <input
                                    name="preco"
                                    type="number"
                                    placeholder="Valor unitário da oferta"
                                    aria-label="Digite o valor unitário"
                                    value={this.state.postOferta.preco}
                                    onChange={this.postSetState} />
                            </div>

                            <hr />
                            {/* checkbox de doação */}
                            <div className="checks" >
                                <div className="check" >
                                    <input
                                        type="checkbox"
                                        aria-label="Doação"
                                        name="checkDoacao"
                                        value={this.state.postOferta.checkDoacao}
                                        onChange={this.handleInputChange} />
                                    <label>Doação</label>
                                </div>
                            </div>

                            {/* seleção da ong que vai a doação */}
                            <div className="campo">
                                <select
                                    name="doacaoOng"
                                    value={this.state.postOferta.doacaoOng}
                                    onChange={this.postSetState}
                                    defaultValue="0"
                                >
                                    <option defaultValue="0">Selecione a Ong</option>
                                    {
                                        this.state.listarOngs.map(function (o) {
                                            return (
                                                <option key={o.idOng} value={o.idOng}> {o.razaoSocial} </option>
                                            )
                                        }.bind(this))
                                    }
                                </select>
                            </div>
                            <hr />
                            <div className="fotos">

                                <input
                                    type="file"
                                    placeholder="Adicione fotos, você também pode arrastá-las"
                                    aria-label="Adicione fotos, você também pode arrastá-las"
                                    name="foto"
                                    ref={this.state.postOferta.foto} />
                            </div>

                            {this.state.erroMsg && <div className="text-danger">{this.state.erroMsg}</div>}

                            <div className="btnCadastro">
                                <button
                                    type="submit"
                                >Cadastrar</button>
                            </div>
                        </form>
                    </div>

                </div>
                <Footer />
            </div>

        );
    }

}

export default Cad_oferta;
