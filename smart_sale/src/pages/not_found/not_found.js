import React, { Component } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

class NotFound extends Component {
    render() {
        return (
            <div className="Faq">
                <Header {...this.props} />
                <main>
                    <div className="not_found">
                        <div className="container">
                            <div className="container1_perguntasfrequentes">
                                <div className="texto_perguntasfrequentes">
                                    <h1>HTTP - 404</h1>
                                    <h1 id="not_found_h">Ops, não encontramos a página que você solicitou...</h1>
                                    <p id="not_found_p">Verifique se digitou o endereço corretamente.</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}
export default NotFound;