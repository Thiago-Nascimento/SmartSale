import React, { Components, Component } from 'react';
import Footer from '../../components/footer/footer';

class Ongs extends Component {

    constructor() {
        super()
        this.state = {
            ong: [],
        }
    }

    componentDidMount() {
        this.mostrarOngs();
    }

    mostrarOngs = () => {

        fetch('http://localhost:5000/api/Ong/')
            .then(response => response.json())
            .then(data =>
                this.setState({ ong: data }))
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        return (
            <div className="ongs_pag">
                <main>
                    <div className="container">
                        <div className="containerOngs">
                            <section className="conteudo">
                                <div className="texto">
                                    {
                                        this.state.ong.map(
                                            function (mostrar) {
                                                return (
                                                    <div key={mostrar.idOng}
                                                        className="Ongs">
                                                        <h1>{mostrar.razaoSocial}</h1>
                                                        <div className="ongs_division">
                                                            <img src={"http://localhost:5000/" + mostrar.fotoOng} className="imagem_ong" alt="Foto da Ong" />
                                                            <p>{mostrar.sobreOng}</p>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )
                                    }
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}
export default Ongs;