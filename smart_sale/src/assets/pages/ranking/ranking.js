import React, { Component } from 'react';

class Ranking extends Component {

    constructor() {
        super()
        this.state = {

            dadosUsu: []

        }
    }

    componentDidMount() {
        this.mostrarDados();
    }

    mostrarDados = () => {

        fetch('http://localhost:5000/api/Usuario')
            .then(response => response.json())
            .then(data => { this.setState({ dadosUsu: data }) })
            .catch(
                error => {
                    console.log(error)
                }
            )
    }

    filtrar = () => {
        console.log()
    }

    render() {
        return (
            <div className="Ranking">
                <main>
                    <div class="ranking_pag">
                        <div class="div">

                            <section class="descricao">
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

                            <section class="ranking">
                                <h3>Ranking</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Pontos</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            this.state.dadosUsu.map(function (dados) {
                                                return (
                                                    <tr key={dados.nomeUsuario}>
                                                        <td>{dados.nomeUsuario}</td>
                                                        <td>{dados.pontuacao}.</td>
                                                    </tr>
                                                );
                                            }.bind(this))
                                        }
                                    </tbody>
                                </table>
                            </section>
                        </div>
                        <div class="botao">
                            <a href="perfil.html" class="a-botao" title="Ir para o perfil">Descubra a sua pontuação em seu
                            perfil!</a>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Ranking;


{/* <tr>
                                        <td>2</td>
                                        <td>Vitor Martins</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larissa Azevedo</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Leonardo Araujo</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Marcela Alicia</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Carlos Morette</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Claudio</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>Claudio</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>Claudio</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>Claudio</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td>Claudio</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>Claudio</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>13</td>
                                        <td>Claudio</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>14</td>
                                        <td>Claudio</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>15</td>
                                        <td>Claudio</td>
                                        <td>100</td>
                                    </tr> */}