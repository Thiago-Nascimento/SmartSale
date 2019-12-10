import React, { Component } from 'react';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

class Final_reserva extends Component {
    render() {
        return (
            <div className="Final_Reserva">
                <Header/>
                <main>
                    <div class="finalreserva_pag">
                        <div class="container">
                            <section class="esquerdo">
                                <div class="texto">
                                    <h2>Seu produto foi reservado com sucesso!</h2>
                                </div>
                                <div class="textos2">
                                    <p>Detalhes da Reserva</p>
                                    <p>Data da compra: 10/12/2019</p>
                                    <p>Quantidade: 1</p>
                                    <p>Vendedor: Ana Cláudia Souza</p>
                                    <p>Valor final: R$50,00</p>
                                </div>
                                <div class="btncompras">
                                    <button>Continue comprando</button>
                                </div>
                            </section>
                            <section class="direito">
                                <div class="prodnome">
                                    <img src="./img/E11-3505-006_zoom1.jpg" alt="Imagem do produto, Tamanco Salto Alto" />
                                    <div class="desc">
                                        <p>Salto Alto tamanho 36</p>
                                        <p>Reservado até 20/12/2019</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }
}
export default Final_reserva;