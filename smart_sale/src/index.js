import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import './assets/css/final.css'

import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

//#region 
import Cad_categoria from "./assets/pages/cad_categoria/cad_categoria";
// import Cad_oferta from "./assets/pages/cad_oferta/cad_oferta"
<<<<<<< HEAD
// import Cad_produto from "./assets/pages/cad_produto/cad_produto"
import Cad_usuario from "./assets/pages/cad_usuario/cad_usuario"
// import Faq from "./assets/pages/faq/faq"
=======
import Cad_produto from "./assets/pages/cad_produto/cad_produto"
// import Cad_usuario from "./assets/pages/cad_usuario/cad_usuario"
import Faq from "./assets/pages/faq/faq"
>>>>>>> e0a9a69e230f3c98b8e757d1ef8ba5a91c3ea2e2
// import Final_reserva from "./assets/pages/final_reserva/final_reserva"
// import Home from "./assets/pages/home/home"
// import Login from "./assets/pages/login/login"
// import NotFound from "./assets/pages/not_found/not_found"
// import Ofertas from "./assets/pages/ofertas/ofertas"
// import Ongs from "./assets/pages/ongs/ongs"
// import Perfil from "./assets/pages/perfil/perfil"
// import Produto from "./assets/pages/produto/produto"
// import QuemSomos from "./assets/pages/quem_somos/quem_somos"
// import Ranking from "./assets/pages/ranking/ranking"
//#endregion

const Rotas = (
    <Router>
        <div>
            <Switch>
                {/* <Route exact path = "/" component={Home}/>                 */}
                {/* <Route path = "/login" component={Login}/> */}
<<<<<<< HEAD
                {/* <Route path = "/cadastrocategoria" component={Cad_categoria}/>
                <Route path = "/cadastrooferta" component={Cad_oferta}/>
                <Route path = "/cadastroproduto" component={Cad_produto}/> */}
                <Route path = "/cadastrousuario" component={Cad_usuario}/>
                {/* <Route path = "/faq" component={Faq}/>
=======
                <Route path = "/cadastrocategoria" component={Cad_categoria}/>
                <Route path = "/cadastroproduto" component={Cad_produto}/>
                <Route path = "/faq" component={Faq}/>
                {/* <Route path = "/cadastrooferta" component={Cad_oferta}/>
                <Route path = "/cadastrousuario" component={Cad_usuario}/>
>>>>>>> e0a9a69e230f3c98b8e757d1ef8ba5a91c3ea2e2
                <Route path = "/finalreserva" component={Final_reserva}/>
                <Route path = "/ofertas" component={Ofertas}/>
                <Route path = "/ongs" component={Ongs}/>
                <Route path = "/perfil" component={Perfil}/>
                <Route path = "/produto" component={Produto}/>
                <Route path = "/quemsomos" component={QuemSomos}/>
                <Route path = "/ranking" component={Ranking}/>
                <Route component={NotFound}/> */}
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
