import React, {Component} from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

class Perfil extends Component {
    render() {
        return (
            <div>
                <Header {...this.props}/>
                <div className="perfil_pag">
                    <div className="perfil_banner">
                        <img src="../SmartSale/img/icons/picture.png" alt="Trocar papel de parede" className="perfil_troca"/>
                        <h2>Débora Nascimento</h2>
                    </div>
                    <div className="cont">
                        <div className="cima">
                            <section className="esquerdo">
                                <img src="img/perfil.png" alt="foto de perfil do usuario" className="perfil_foto"/>
                                <div className="textos">
                                    <h4>Dados pessoais</h4>
                                    <p>Endereço: Rua São Paulo, 500 - SP</p>
                                    <p>Data de nascimento: 25/04/1990</p>
                                    <p>Sexo: Feminino</p>
                                </div>
                                <div className="textos">
                                    <h4>Contato</h4>
                                    <p>E-mail:debora.nasc@hotmail.com</p>
                                    <p>celular:(11)94444-5678</p>
                                </div>
                                <div className="perfil_placar_rank">
                                    <h4>Posição ranking</h4>
                                    <div className="perfil_rank">
                                        <p>100 pontos</p>
                                    </div>
                                </div>
                                <div className="perfil_button_padding">
                                    <div className="perfil_btn_produto">
                                        <p><a href="#" className="perfil_btn-medium">Cadastrar um produto</a></p>
                                    </div>
                                </div>
                            </section>
                            <section className="direito">
                                <div className="direito-cards-h3">
                                    <h3>Seus Produtos</h3>
                                </div>
                                <div className="card-cursos-home">
                                    <div className="card">
                                        <div className="html-card-cursos-home"></div>
                                        <div className="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="html-card-cursos-home"></div>
                                        <div className="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="html-card-cursos-home"></div>
                                        <div className="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="perfil_button_padding">
                                    <div className="perfil_btn_produto">
                                        <p><a href="#" className="perfil_btn-medium">Ver mais</a></p>
                                    </div>
                                </div>
                                <div className="direito-cards-h3">
                                    <h3>Seus Produtos</h3>
                                </div>
                                <div className="card-cursos-home">
                                    <div className="card">
                                        <div className="html-card-cursos-home"></div>
                                        <div className="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="html-card-cursos-home"></div>
                                        <div className="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="html-card-cursos-home"></div>
                                        <div className="curso-info-home">
                                            <h4>Pão Caseiro</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="perfil_button_padding">
                                    <div className="perfil_btn_produto">
                                        <p><a href="#" className="perfil_btn-medium">Ver mais</a></p>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="baixo">
                            <section className="centro">

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