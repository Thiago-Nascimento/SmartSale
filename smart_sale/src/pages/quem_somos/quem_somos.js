import React, { Component } from 'react'

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import logo from '../../assets/img/União19.png'

class QuemSomos extends Component {
    render() {
        return (
            <div className="QuemSomos">
                <Header {...this.props} />
                <section className="quemsomos_tudo">
                    <div className="quemsomos_pag">
                        <div className="imagem_quemsomos">
                            <div>
                                <section className="quemsomos_texto_one">
                                    <h1>Objetivo</h1>
                                    <p>
                                        O objetivo dessa aplicação trás ofertas de produtos até nossos clientes. Ofertas essas de
                                        produtos
                                        com data de validade próximas, portanto, com um preço mais acessível. Ótimo para os que
                                        querem
                                        economizar e evitar que produtos não tenham um destino sem consumo. Desenvolvido pela
                                        empresa
                                        -Faivi-, apresenta soluções envolvendo doações para ONGs e até mesmo um ranking de
                                        vendedores e
                                        clientes. Há vantagens de se utilizar a Smart Sale, entre elas a diminuição do desperdício
                                        que
                                        muitos produtos sofrem ao não serem consumidos ou descartados por perecerem. Com esta
                                        solução,
                                        estes
                                        produtos são consumidos antes de perecerem, sejam por consumidores ou ONGs. Outra vantagem é
                                        a
                                        possibilidade de encontrar produtos em oferta e com um preço mais acessível. Além desses
                                        benefícios,
                                        um ranking apresenta a colocação de quem utiliza a aplicação e efetua doações.
                                </p>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="quemsomos_partetwo">
                        <section className="quemsomos_texto_two">
                            <div className="quemsomos_esquerdo">
                                <h2>Quem somos</h2>
                                <p>
                                    A Smart Sale é uma aplicação brasileira que visa a redução do desperdício de alimentos visando pequenos e médios varejistas.
                                    Nosso diferencial é a possiilidade os alimentos irem para ONGS ligadas a aplicação.
                                </p>
                                <h2>O que propomos</h2>
                                <p>
                                    Propomos a redução do desperdício de alimentos perto de sua validade. Atuamos no ramo alimenticio e de vestuário.
                                </p>
                            </div>
                            <div className="quemsomos_direito">
                                <img src={logo} alt="Logo roxo Smart Sale" />
                            </div>
                        </section>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}
export default QuemSomos;