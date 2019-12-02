import React, {Component} from 'react';
import Footer from '../../components/footer/footer';

class Perfil extends Component {
    render() {
        return (
            <div>
                <div class="perfil_pag">
                    <div class="perfil_banner">
                        <img src="../SmartSale/img/icons/picture.png" alt="Trocar papel de parede" class="perfil_troca"/>
                        <h2>Débora Nascimento</h2>
                    </div>
                    <div class="cont">
                        <div class="cima">
                            <section class="esquerdo">
                                <img src="img/perfil.png" alt="foto de perfil do usuario" class="perfil_foto"/>
                                <div class="textos">
                                    <h4>Dados pessoais</h4>
                                    <p>Endereço: Rua São Paulo, 500 - SP</p>
                                    <p>Data de nascimento: 25/04/1990</p>
                                    <p>Sexo: Feminino</p>
                                </div>
                                <div class="textos">
                                    <h4>Contato</h4>
                                    <p>E-mail:debora.nasc@hotmail.com</p>
                                    <p>celular:(11)94444-5678</p>
                                </div>
                                <div class="perfil_placar_rank">
                                    <h4>Posição ranking</h4>
                                    <div class="perfil_rank">
                                        <p>100 pontos</p>
                                    </div>
                                </div>
                                <div class="perfil_button_padding">
                                    <div class="perfil_btn_produto">
                                        <p><a href="#" class="perfil_btn-medium">Cadastrar um produto</a></p>
                                    </div>
                                </div>
                            </section>
                            <section class="direito">
                                <div class="direito-cards-h3">
                                    <h3>Seus Produtos</h3>
                                </div>
                                <div class="card-cursos-home">
                                    <div class="card">
                                        <div class="html-card-cursos-home"></div>
                                        <div class="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="html-card-cursos-home"></div>
                                        <div class="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="html-card-cursos-home"></div>
                                        <div class="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="perfil_button_padding">
                                    <div class="perfil_btn_produto">
                                        <p><a href="#" class="perfil_btn-medium">Ver mais</a></p>
                                    </div>
                                </div>
                                <div class="direito-cards-h3">
                                    <h3>Seus Produtos</h3>
                                </div>
                                <div class="card-cursos-home">
                                    <div class="card">
                                        <div class="html-card-cursos-home"></div>
                                        <div class="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="html-card-cursos-home"></div>
                                        <div class="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="html-card-cursos-home"></div>
                                        <div class="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="perfil_button_padding">
                                    <div class="perfil_btn_produto">
                                        <p><a href="#" class="perfil_btn-medium">Ver mais</a></p>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="baixo">
                            <section class="centro">

                            </section>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    } 
}
export default Perfil;