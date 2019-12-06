import React, { Component } from "react";
import {Link} from 'react-router-dom';

import Logo from '../../assets/img/Agrupar 110.png';
import Avatar from '../../assets/img/avatar.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro : "",
            lista : []
        }
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
            this.setState({lista : response});
            
            this.props.history.push({
                pathname:"/ofertas",
                state : {
                    listaFiltrada: this.state.lista
                }
            })   
            
        })
        .catch(erro => {
            console.log("Erro: ", erro);
        })
    }
    
    atualizaEstado = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    render() {
        return(
            <header>
                <div className="contHeader">
                    <div className="container">
                        <div className="ca">
                            <div className="separador-header">
                                <div className="logo">
                                    <Link to="/">
                                        <img src={Logo} title="Home Smart Sale" alt="logo smart sale"/>
                                    </Link>
                                </div>
                                <form onSubmit={this.filtrar}>
                                    <input type="search" 
                                    placeholder="Buscar produtos, marcas e muito mais ..." 
                                    aria-label="Faça uma busca" 
                                    name="filtro"
                                    onChange={this.atualizaEstado}
                                    className="search-bar"
                                    />
                                    <input className="search-btn" type="submit"></input>    
                                </form>                        
                                <div className="botao-login">
                                    <Link to="/login">
                                        <img src={Avatar} alt="Link para fazer login" title="Faça login" id="entrar"/>
                                        <p>Entrar</p>
                                    </Link>
                                </div>
                            </div>
                            <nav>
                                <div className="menu-centro">
                                    <ul className="menu">
                                        <li><Link to="/" title="Smart sale home">Home</Link></li>
                                        <li><Link to="/quemsomos" title="Smart sale quem somos">Quem somos</Link></li>
                                        <li><Link to="/ongs" title="Smart sale ongs">ONGs</Link></li>
                                        <li><Link to="/ranking" title="Smart sale ranking">Ranking</Link></li>
                                        <li><Link to="/ofertas" title="Smart sale categorias">Ofertas</Link></li>
                                        <li><Link to="/perfil" title="Smart sale perfil">Perfil</Link></li>
                                        <li><Link to="/faq" title="Smart sale faq">FAQ</Link></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <button className="btn-menu"><i className="fa fa-bars fa-lg"></i></button>
                        <a className="btn-close"><i className="fa fa-times"></i></a>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;

