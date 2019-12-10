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
            filtro: "",
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
    }

    listarOfertas = () => {
        fetch("http://localhost:5000/api/oferta")
        .then(response => response.json())
        .then(data => {
            console.log("Mostrando a lista: ", data);
            this.setState({listaProdutos : data})
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
            console.log("Lista Produtos: ", this.state. listaProdutos)
        })
        .catch(erro => {
            console.log("Erro: ", erro);
        })
    }

    ordenar = (e) => {
        e.preventDefault();
        var dataAtual = new Date()
        var dataValidade = new Date()
        var order = this.state.listaProdutos.sort(
            function (oferta) {
                dataValidade = Date(oferta.dataValidade)
                return dataAtual - dataValidade
                // PArei aqui
            }
        )
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
            this.ordenar();
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
                                    <option value="longeVe'ncimento">Mais Distante do Vencimento</option>
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