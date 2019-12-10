import React, { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import Header from '../../components/header/header';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';


class Cad_produto extends Component {

    constructor() {
        super()
        this.state = {
            listaCategorias: [],
            listaProdutos: [],

            cadastrarProduto: {
                nomeProduto: "",
                pontos: "",
                idCategoria: ""
            },

            erroMsg: "",
            sucessMsg: "",
            modal: false,

            editarModal: {
                nomeProduto: "",
                pontos: ""
            }
        }

        this.postProduto = this.postProduto.bind(this);
        this.salvarAlteracoes = this.salvarAlteracoes.bind(this);
        this.postProduto = this.postProduto.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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
    }


    getCategorias = () => {
        console.log("Categorias listadas")
        fetch("http://localhost:5000/api/Categoria")
            .then(response => response.json())
            .then(data => {
                this.setState({ listaCategorias: data })
            })
    }

    // Cadastrar produto
    postProduto(event) {
        event.preventDeafult()
        console.log("cadastrando")
        fetch("http://localhost:5000/api/Produto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nomeProduto: this.state.cadastrarProduto.nomeProduto })
        })
            .then(response => response.json())
            .then(response => {
                this.listaProdutos()
                console.log(response)
            })
            .catch(error => console.log("Não foi possível cadastrar. Erro: " + error))
    }

    postSetState = (input) => {
        this.setState({
            cadastrarProduto: {
                ...this.state.cadastrarProduto,
                [input.target.name]: input.target.value
            }

        })
    }

    // put
    alterarProduto = (produto) => {
        console.log(produto)

        this.setState({
            editarModal: {
                idProduto: produto.idProduto,
                nomeProduto: produto.nomeProduto
            }
        })
        // abre modal
        this.toggle()
    }

    salvarAlteracoes(event) {
        event.preventDefault()

        let eventoput = this.state.editarModal;

        fetch("http://localhost:5000/api/Produto/" + this.state.editarModal.idProduto, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventoput)
        })
            .then(response => response.json())
            .then(response => {
            })
            .catch(error => console.log(error)
            )

        // ficou fora da requisição para atualizar assim que fechar o modal
        setTimeout(() => {
            // console.log(response)
            this.getProdutos()
        }, 1500);
        // fechar modal
        this.toggle()
    }

    atualizaEditarModalTitulo(input) {
        this.setState({
            // o setState tem um objeto com duas propriedades, por isso que ele não aparecia no título do modal
            // quanado ele era chamado, a função tinha apenas as propriedades, no caso, precisa de um objeto com essas props
            editarModal: {
                idProduto: this.state.editarModal.idProduto,
                nomeProduto: input.target.value
            }
        })
    }


    deletarProduto(id) {
        console.log("Excluindo")
        fetch("http://localhost:5000/api/Produto/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.getProdutos();
                this.setState(() => ({ listaProdutos: this.state.listaProdutos }))
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        return (
            <div>
                <Header {...this.props} />
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
                                                        <MDBBtn color="primary" size="sm" onClick={() => this.alterarProduto(e)}>
                                                            Alterar
                                                        </MDBBtn>
                                                        <MDBBtn color="danger" size="sm" onClick={() => this.deletarProduto(e.produtoId)}>
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
                                    }.bind(this))
                                }
                            </select>

                            <div className="btnCadastro">
                                <button type="submit">Cadastrar</button>
                            </div>
                        </form>

                        <MDBContainer>
                            <form onSubmit={this.salvarAlteracoes}>
                                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                    <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.nomeProduto} </MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBInput label="Produto" value={this.state.editarModal.nomeProduto}
                                            onChange={this.atualizaEditarModalTitulo.bind(this)} />
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                        <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </form>
                        </MDBContainer>



                    </div>

                </div>
            </div>
        )
    }
}
export default Cad_produto;