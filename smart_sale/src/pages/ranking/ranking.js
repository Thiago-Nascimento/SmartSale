import React, { Component } from 'react';

import Footer from '../../components/footer/footer';

class Ranking extends Component {

    constructor() {
        super()
        this.state = {

            dadosUsu: [],

        }
    }

    componentDidMount() {
        this.mostrarDados();
    }


    // GET
    mostrarDados = () => {
        fetch('http://localhost:5000/api/Usuario')
            .then(response => response.json())
            .then(data => {
                var order = data.sort(
                    function (a, b) {
                        return b.pontuacao - a.pontuacao
                    }
                )
                this.setState({ dadosUsu: order })
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
    }


    render() {
        return (
            <div className="Ranking">
                <main>
                    <div className="ranking_pag">
                        <div className="div">

                            <section className="descricao">
                                <h3>Sobre o ranking</h3>
                                <br />
                                <p>
                                    Este ranking mostra os clientes que mais fizeram compras em nossa aplicação, merecem ser
                                    enaltecidas por economizarem em suas compras e evitando o desperdício de produtos que
                                    eventualmente poderiam ser descartados. O ranking dos vendedores enaltece quem doa seus produtos
                                    que não são vendidos, também evitando desperdício e colaborando para uma ONG que fará bom uso
                                    desses produtos.
                            </p>
                                <br />
                                <p>
                                    Você pode estar em uma boa colocação no ranking ao comprar produtos com pontos, quanto mais
                                    produtos você comprar, mais pontos você acumula. Dessa forma, é incentivado a compra de produtos
                                    não destinados à doação para que não haja desperdício desse produto por conta de venda.
                            </p>
                                <br />
                                <p>
                                    A causa desse ranking é apresentar os compradores preocupados com a causa, quem opta por
                                    economizar e também por ajudar os vendedores a não sofrerem prejuízo com produtos desperdiçados
                                    ou descartados.
                            </p>
                            </section>

                            <section className="ranking">
                                <h3>Ranking</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th id="ranking_pontos_table">Pontos</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            this.state.dadosUsu.map(function (dados) {
                                                return (
                                                    <tr key={dados.idUsuario}>
                                                        <td>{dados.nomeUsuario}</td>
                                                        <td id="pontuacao">{dados.pontuacao}</td>
                                                    </tr>
                                                );
                                            }
                                            )
                                        }
                                    </tbody>
                                </table>
                            </section>
                        </div>
                        <div className="botao">
                            <a href="perfil.html" className="a-botao" title="Ir para o perfil">Descubra a sua pontuação em seu
                            perfil!</a>
                        </div>
                    </div>
                </main>
                <Footer />

            </div>
        );
    }
}

export default Ranking;