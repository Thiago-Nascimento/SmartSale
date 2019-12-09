import React, { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import Header from '../../components/header/header';

class Cad_produto extends Component {

    constructor() {
        super()
        this.state = {
            listaCategorias: [],
            listaProdutos: [],

            postProduto: {
                nomeProduto: "",
                pontos: "",
                idCategoria: ""
            },

            putProduto: {
                nomeProduto: "",
                pontos: "",
                idCategoria: ""
            },

            erroMsg: "",
            sucessMsg: "",
            modal: false
        }
    }

    // após carregar o DOM
    componentDidMount() {
        this.getProdutos()
        this.getCategorias()
    }

    componentDidUpdate() {
        //chamado assim que ocorre uma atualização/mudança
        console.log("Atualizado")
    }

    getProdutos = () => {
        console.log("lista atualizada")
        fetch("http://localhost:5000/api/produto")
            .then(response => response.json())
            .then(data => {
                this.setState({ listaProdutos: data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    getCategorias = () => {
        console.log("Categorias listadas")
        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => {
                this.setState({ listaCategorias: data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    postProduto = (event) => {
        event.preventDeafult()
        console.log("cadastrando")
        fetch("http://localhost:5000/api/categoria",{
            method : "POST",
            body : JSON.stringify({ nomeProduto: this.state.nome }),
            headers : {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            this.listaProdutos()
            console.log("Cadastrou")
        })
        .catch(error => console.log(error))
}

postSetState = (input) => {
    this.setState({
        postProduto : {
            ...this.state.postProduto, [input.target.name] : input.target.value
        }

    })
}



render() {
    return (
        <div>
            <Header {...this.props}/>
            <div className="fundoCadastro">
                <div className="cardCadastro">
                    <h2>Cadastro de Produto</h2>

                    <table id="tabela-lista">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome do produto</th>
                                <th>Pontuação</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody id="tabela-lista-corpo">
                            {
                                this.state.listaProdutos.map(
                                    function (e) {
                                        return (
                                            <tr key={e.idProduto}>
                                                <td>{e.idProduto}</td>
                                                <td>{e.nomeProduto}</td>
                                                <td>{e.pontos}</td>
                                                <td>{e.idCategoriaNavigation.nomeCategoria}</td>
                                                <td>
                                                    <MDBBtn color="primary" size="sm" onClick={() => this.openModal(e)}>
                                                        Alterar
                                                        </MDBBtn>
                                                    <MDBBtn color="danger" size="sm" onClick={() => this.deleteProduto(e.produtoId)}>
                                                        Deletar
                                                        </MDBBtn>
                                                </td>
                                            </tr>
                                        )
                                    }.bind(this)
                                )
                            }
                        </tbody>
                    </table>
                    <br></br>
                    <br></br>

                    <form id="form_cadastro_produto" onSubmit={this.postProduto}>
                        <div className="campo">
                            <input type="text" placeholder="Nome do produto" aria-label="Digite o nome do produto" name="nome"
                                required />
                        </div>
                        <div className="campo">
                            <input type="text" placeholder="Pontuação do produto" aria-label="Digite a pontuação do produto" name="pontuacao"
                                required />
                        </div>
                        <select id="option__categoria"
                            name="categoriaId"
                            value={this.state.listaCategorias.nomeCategoria}
                            onChange={this.postSetState}
                        >
                            <option value="">Escolha uma categoria...</option>
                            {
                                this.state.listaCategorias.map(function (c) {
                                    return (
                                        <option
                                            key={c.nomeCategoria}
                                            value={c.nomeCategoria}
                                        >
                                            {c.nomeCategoria}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <div className="btnCadastro">
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}
}
export default Cad_produto;