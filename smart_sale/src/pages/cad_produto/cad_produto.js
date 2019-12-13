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

            alterarProduto: {
                idProduto: "",
                nomeProduto: "",
                pontos: "",
                idCategoria: ""
            }
        }
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
    postProduto = (event) => {
        event.preventDefault()
        console.log("cadastrando")
        fetch("http://localhost:5000/api/Produto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeProduto: this.state.cadastrarProduto.nomeProduto,
                pontos: this.state.cadastrarProduto.pontos,
                idCategoria: this.state.cadastrarProduto.idCategoria
            })
        })
            .then(response => response.json())
            .then(response => {
                this.getProdutos()
                console.log(response)
            })
            .catch(error =>
                console.log("Não foi possível cadastrar. Erro: " + error))
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
    // aqui altera o modal - chamado no botão de cada item de produtos (do lado)
    alterarProduto = (produto) => {
        console.log("alterando estado do produto")

        this.setState({
            alterarProduto: produto
        })
        // abre modal
        this.toggle()
    }

    // permite alterar o estado do form
    // chamado no form de alterar produto
    atualizaEstadoAlterarProduto = (input) => {
        console.log("alterando estado")

        let dado = input.target.name;
        
        this.setState({
            alterarProduto: {
                ...this.state.alterarProduto,
                [input.target.name]: input.target.value
            }
            // mostra o produto sendo alterado no console
        }, () => console.log(this.state.alterarProduto[dado]))  
    }

    // método com fetch, apenas salva no banco
    salvarAlteracoes = (event) => {
        event.preventDefault()

        let idprod = this.state.alterarProduto.idProduto;
        let alterarprod = this.state.alterarProduto;

        fetch("http://localhost:5000/api/Produto/" + idprod, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alterarprod)
        })
            .then(response => response.json())
            .catch(error => console.log("Não atualizou. Erro: " + error))

        setTimeout(() => {
            this.getProdutos()
        }, 1500);

        // fechar modal
        this.toggle()
    }

    deletarProduto = (produto) => {
        console.log("Excluindo")
        fetch("http://localhost:5000/api/Produto/" + produto, {
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
                console.log("Não deletou" + error)
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
                                                        <MDBBtn color="danger" size="sm" onClick={() => this.deletarProduto(e.idProduto)}>
                                                            Deletar
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            )
                                        }.bind(this))
                                }
                            </tbody>
                        </table>
                        
                        <br></br>
                        <br></br>

                        <form id="form_cadastro_produto" onSubmit={this.postProduto}>
                            <div className="campo">
                                <input 
                                type="text" 
                                placeholder="Nome do produto" 
                                aria-label="Digite o nome do produto" 
                                name="nomeProduto"
                                required 
                                onChange={this.postSetState}
                                value={this.alterarProduto.nomeProduto}/>
                            </div>
                            <div className="campo">
                                <input 
                                type="text" 
                                placeholder="Pontuação do produto" 
                                aria-label="Digite a pontuação do produto" 
                                name="pontos"
                                required 
                                onChange={this.postSetState}
                                value={this.alterarProduto.pontos}/>
                            </div>
                            <select id="option__categoria"
                                name="idCategoria"
                                value={this.state.listaCategorias.nomeCategoria}
                                onChange={this.postSetState}
                            >
                                <option value="">Escolha uma categoria...</option>
                                {
                                    this.state.listaCategorias.map(function (c) {
                                        return (
                                            <option key={c.idCategoria} value={c.idCategoria}>{c.nomeCategoria}</option>
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
                                    <MDBModalHeader toggle={this.toggle}>Editar - {this.state.alterarProduto.nomeProduto} </MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBInput 
                                        label="Produto" 
                                        name="nomeProduto"
                                        value={this.state.alterarProduto.nomeProduto}
                                        onChange={this.atualizaEstadoAlterarProduto} />

                                        
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