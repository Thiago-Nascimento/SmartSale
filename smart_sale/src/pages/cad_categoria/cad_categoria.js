import React, {Component} from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBInput, MDBBtn } from 'mdbreact';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

class Cad_categoria extends Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            
            listaCategorias : [],            
            
            categoriaCadastrando: {
                nomeCategoria : ""
            },

            categoriaAlterando: {
                idCategoria: "",
                nomeCategoria : ""
            }


        }

        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
        this.deletarCategoria = this.deletarCategoria.bind(this);
        this.salvarAlteracoes = this.salvarAlteracoes.bind(this);
        
    }
    
    UNSAFE_componentWillMount(){
        // document.title = this.props.titulo_pagina;
        console.log("Carregando...");
    }

    componentDidMount(){
        console.log("Carregado");
        this.listarCategorias();
    }

    componentDidUpdate(){
        console.log("Atualizando");
    }

    componentWillUnmount(){
        console.log("Saindo");
    }
    
    listarCategorias = () => {
        fetch("http://localhost:5000/api/categoria")
        .then(response => response.json())
        .then(data => {
            console.log("Mostrando a lista: ", data);
            this.setState({listaCategorias : data})
        });
    }

    atualizaEstadoCadastro = (input) => {
        let nomePropriedade = input.target.name;
        
        this.setState({
            categoriaCadastrando: {
                ...this.state.categoriaCadastrando,
                [input.target.name]: input.target.value
            }
        }, () => console.log(this.state.categoriaCadastrando[nomePropriedade]))        
    }
    
    atualizaEstadoAlterar = (input) => {
        console.log("atualizaEstadoAlterar chamada")
        let nomePropriedade = input.target.name;
        
        this.setState({
            categoriaAlterando: {
                ...this.state.categoriaAlterando,
                [input.target.name]: input.target.value
            }
        }, () => console.log(this.state.categoriaAlterando[nomePropriedade]))        
    }

    cadastrarCategoria(event) {
        event.preventDefault();
        console.log("Cadastrando");
        console.log(this.state.categoriaCadastrando.nomeCategoria);
        fetch("http://localhost:5000/api/Categoria", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ nomeCategoria : this.state.categoriaCadastrando.nomeCategoria})
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.listarCategorias();
        })
        .catch(error => console.log(error))
    }

    deletarCategoria(id) {
        console.log("Excluindo")
        fetch("http://localhost:5000/api/categoria/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.listarCategorias();
            this.setState(() => ({listaCategorias: this.state.listaCategorias}))
        })
        .catch(error => {
            console.log(error);
            // this.setState({erroMsg: "Não foi possível excluir este evento"})
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    alterarCategoria = (categoria) => {
        this.setState({ categoriaAlterando : categoria })
        this.toggle();
    }

    salvarAlteracoes(event) {
        event.preventDefault();

        let categoria_id = this.state.categoriaAlterando.idCategoria;
        let categoria_put = this.state.categoriaAlterando;

        fetch("http://localhost:5000/api/categoria/" + categoria_id, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(categoria_put)
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        setTimeout(() => {
            this.listarCategorias();
        }, 500)

        this.toggle();
    }

    render() {
        return (
            <div>
                <Header {...this.props}/>
                <div className="fundoCadastro">
                    <div className="cardCadastro">
                        <h2>Categorias Cadastradas</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome Categoria</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // Percorre a lista de categorias
                                    this.state.listaCategorias.map( function(categoria) {
                                        return (
                                            // Atribui uma chave unica "id" para cada linha
                                            <tr key={categoria.idCategoria}>
                                                <td>{categoria.idCategoria}</td>
                                                <td>{categoria.nomeCategoria}</td>
                                                <td>
                                                    <button onClick= { () => this.alterarCategoria(categoria) }>Alterar</button>
                                                    <button onClick= { () => this.deletarCategoria(categoria.idCategoria) }>Excluir</button>
                                                </td>
                                            </tr>
                                        )
                                    }.bind(this))  // Usado para vincular todo o contexto do map
                                }
                            </tbody>
                        </table>
                        
                        <h2>Cadastro de Categoria</h2>
                        <div className="descricao">
                            <p>Preencha os campos abaixo para efetuar o cadastro da categoria.</p>
                        </div>
                        <form onSubmit={this.cadastrarCategoria}>
                            <div className="campo">
                                <input onChange={this.atualizaEstadoCadastro} type="text" placeholder="Nome da categoria" aria-label="Digite o nome da categoria" name="nomeCategoria" required/>
                            </div>
                            <div className="btnCadastro">
                                <button type="submit">Cadastrar</button>
                            </div>
                        </form>

                        <MDBContainer>
                            <form onSubmit={this.salvarAlteracoes}>
                                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                    <MDBModalHeader toggle={this.toggle}>Editar {this.state.categoriaAlterando.nomeCategoria}</MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBInput label="Categoria" name="nomeCategoria" value={this.state.categoriaAlterando.nomeCategoria} size="lg" onChange={this.atualizaEstadoAlterar}/>
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
                <Footer/>
            </div>
        );
    }
}
export default Cad_categoria;