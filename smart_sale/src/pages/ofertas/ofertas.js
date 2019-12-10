import React, { Component } from 'react';
import Card from './../../components/card/card'
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

class Ofertas extends Component {
    constructor (){
        super();

        this.state = {
            listaProdutos: [],
            listaRegioes: [],
            listaOrdenada: [],
            filtro: "",
            ordenarPor: ""
        }
    }
    
    componentDidMount(){
        console.log("Minhas props OFERTAS: ", this.props);
        if(this.props.location.state != null) {
            console.log("this.props.location.state.listaFiltrada");
            console.log(this.props.location.state.listaFiltrada);
            this.setState({listaProdutos : this.props.location.state.listaFiltrada})
        } else {
            this.listarOfertas();
        } 
        console.log("listaProdutos", this.state.listaProdutos);
        this.listarRegioes(); 
          
        // this.ordenar();    
    }

    listarOfertas = () => {
        fetch("http://localhost:5000/api/oferta")
        .then(response => response.json())
        .then(data => {
            console.log("Mostrando a lista: ", data);
            this.setState({listaProdutos : data})
            setTimeout(this.ordenar(), 500)
        });
    }

    listarRegioes = () => {
        fetch("http://localhost:5000/api/regiao")
        .then(response => response.json())
        .then(data => {
            console.log("Mostrando a lista: ", data);
            this.setState({listaRegioes : data})
        });
    }

    filtrar = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/Oferta/FiltrarPorNome", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({filtro : this.state.filtro})
        })
        .then(response => response.json())
        .then(response => {
            this.setState({listaProdutos : response});
            console.log("Lista Produtos: ", this.state.listaProdutos)
        })
        .catch(erro => {
            console.log("Erro: ", erro);
        })
    }

    ordenar = (criterio) => {
        // e.preventDefault();
        switch (criterio) {
            case "proximoVencimento":
                this.state.listaProdutos.sort(
                    function (a, b) {
                        if(a.dataValidade > b.dataValidade) {
                            return 1;
                        }
                        if(a.dataValidade < b.dataValidade) {
                            return -1;
                        }
                        return 0;
                    }
                )               
                break;
            
            case "longeVencimento":
                this.state.listaProdutos.sort(
                    function (a, b) {
                        if(a.dataValidade > b.dataValidade) {
                            return -1;
                        }
                        if(a.dataValidade < b.dataValidade) {
                            return 1;
                        }
                        return 0;
                    }
                )
                break;
                    
            case "menorPreco":
                this.state.listaProdutos.sort(
                    function (a, b) {
                        if(a.preco > b.preco) {
                            return -1;
                        }
                        if(a.preco < b.preco) {
                            return 1;
                        }
                        return 0;
                    }
                )
                break;
                    
            case "maiorPreco":
                this.state.listaProdutos.sort(
                    function (a, b) {
                        if(a.preco > b.preco) {
                            return 1;
                        }
                        if(a.preco < b.preco) {
                            return -1;
                        }
                        return 0;
                    }
                )
                break;

            default:
                break;
        }      
    }

    atualizaEstadoSelect = (input) => {
        this.setState({
            [input.target.name]: input.target.value
        })
    }
    
    atualizaSelectOrdenar = (input) => {
        this.setState({
            [input.target.name]: input.target.value
        })
        setTimeout(() => {
            this.ordenar(this.state.ordenarPor);
        }, 500)
    }


    
    render() {
        return(             
            <div>
                <Header {...this.props}/>
                <div className="cont">
                    <div className="container">
                        <div className="containerProdutos">
                            <h1>Ofertas</h1>
                            <section className="filtros">
                                <h2>Filtrar</h2>
                                <div className="innerFiltros">
                                    <form onSubmit={this.filtrar} className="divSelects">
                                        <label>Bairro/Região:</label>
                                        <select name="filtro" value={this.state.filtroRegiao} onChange={this.atualizaEstadoSelect}>
                                            {
                                                this.state.listaRegioes.map(function (regiao) {
                                                    return (
                                                        <option key={regiao.idRegiao} value={regiao.bairro}>{regiao.bairro}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <button  type="submit" className="btnAplicarFiltros">Aplicar</button>
                                    </form>
                                </div>
                            </section>
                            <section className="ordenar">
                                <label>Ordenar por: </label>
                                <select name="ordenarPor" onChange={this.atualizaSelectOrdenar}>
                                    <option value="proximoVencimento">Mais Próximo ao Vencimento</option>
                                    <option value="longeVencimento">Mais Distante do Vencimento</option>
                                    <option value="menorPreco">Menor Preço</option>
                                    <option value="maiorPreco">Maior Preço</option>
                                </select>
                            </section>
                            <section className="categorias">
                            {
                                this.state.listaProdutos.map(
                                    function (oferta) {
                                        return (
                                            <div key={oferta.idOferta}>
                                                <Card idOferta={oferta.idOferta} foto={oferta.foto} titulo={oferta.titulo} preco={oferta.preco} quantidade={oferta.quantidade} 
                                                bairro={oferta.idUsuarioNavigation.idRegiaoNavigation.bairro}
                                                />
                                            </div>
                                        );
                                    }
                                )
                            }
                            </section>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Ofertas;