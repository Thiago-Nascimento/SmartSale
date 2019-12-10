import React, { Component } from 'react';





class Cad_oferta extends Component {
    constructor() {
        super()
        this.state = {

            listarUsu: [],

            listarOngs: [],

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
                doacao: false,
                reserva: false


            },
        }

    }

    componentDidMount() {
        console.log("Carregando")
    }


    postSetState = (input) => {
        this.setState({
            postOferta: {
                ...this.state.postOferta,
                [input.target.name]: input.target.value
            }
        })
    }




    getOngs = () => {
        fetch('http://localhost:5000/api/Ong/')
            .then(response => response.json())
            .then(data => this.setState({ listarOngs: data }))
            .catch( error => {
                console.log(error)
            })

    }

    listarGET = () => {

        fetch("http://localhost:5000/api/Oferta/")
            .then(response => response.json())
            .then(data => this.setState({ listarOferta: data }))
            .catch(error => {
                console.log(error)
            })
    }

    postOferta = (e) => {
        e.preventDefault();

        console.log(this.state.postOferta)

        let oferta = new FormData();

        oferta.set("titulo", this.state.postOferta.titulo);
        oferta.set("quantidade", this.state.postOferta.quantidade);
        oferta.set("cor", this.state.postOferta.cor);
        oferta.set("dataValidade", this.state.postOferta.dataValidade);
        oferta.set("preco", this.state.postOferta.preco);
        oferta.set("descricao", this.state.postOferta.descricao);
        oferta.set("foto", this.state.postOferta.foto.current.files[0]);
        oferta.set("doacao", this.state.postOferta.doacao)
        oferta.set("idProduto", this.state.postOferta.idProduto)
        oferta.set("idUsuario", this.state.postOferta.idUsuario)


        console.log(oferta)

        fetch('http://localhost:5000/api/Oferta', {
            method: "POST",
            body: oferta,
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listarGET();
            })

            .catch(error => console.log('Não foi possivel cadastrar:' + error))
    }





    render() {
        return (
            <div className="fundoCadastro">
                <div className="cardCadastro">
                    <h2>Cadastro de Oferta</h2>
                    <div className="descricao">
                        <p>Preencha os campos abaixo para efetuar o cadastro da sua oferta.</p>
                        <p>Marque a opção de doação se quiser que seu produto seja doado.</p>
                    </div>
                    <form onSubmit={this.postOferta} method="POST" id="form_cadastro_venda">
                        <div className="campo">

                            <input
                                type="text"
                                placeholder="Nome do produto"
                                aria-label="Digite seu nome"
                                name="titulo"
                                required
                                value={this.state.postOferta.titulo}
                                onChange={this.postSetState} />
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
                                placeholder="Cor"
                                aria-label="Digite a cor"
                                name="cor"
                                required
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
                        <div className="checks" >
                            <div className="check" >
                                <input
                                    type="checkbox"
                                    aria-label="Doação"
                                    name="doacao"
                                    checked={this.state.postOferta.doacao}
                                    onChange={this.postSetState} />
                                <label>Doação</label>
                            </div>
                        </div>
                        <div class="ongsDoacao">

                                <option value="">Selecione uma Ong</option>

                                <select>
                                        <option value="0">Selecione a Ong</option>
                                        {
                                            this.state.listarOngs.map(
                                                function (o) {
                                                    return (
                                                        <option key={o.idOng} value="0">{o.razaoSocial}</option>
                                                    )
                                            })
                                        }
                                    </select>

                        </div>
                        <hr />
                        <div className="fotos">

                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                placeholder="Adicionar fotos Você também pode arrasta-lás"
                                aria-label="Adicionar fotos Você também pode arrasta-lás"
                                name="foto"
                                ref={this.state.postOferta.foto} />
                        </div>
                        <div className="btnCadastro">
                            <button
                                type="submit"
                            >Cadastrar</button>
                        </div>
                    </form>
                </div>

            </div>

        );
    }

}

export default Cad_oferta
    ;