import React, { Component } from 'react';
import Card from './../../components/card/card'

class Ofertas extends Component {
    constructor (){
        super();
    }
    
    componentDidMount(){
        console.log("Minhas props OFERTAS: ", this.props);
        // console.log(this.props.location.state.listaFiltrada);
    }
    
    render(){
        return( 
            
            <Card/>
        );
    }
}
export default Ofertas;