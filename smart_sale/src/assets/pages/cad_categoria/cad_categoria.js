import React, {Component} from 'react';

class Cad_categoria extends Component {
    render() {
        return (
            <div className="fundoCadastro">
                <div className="cardCadastro">
                    <h2>Cadastro de Oferta</h2>
                    <div className="descricao">
                        <p>Preencha os campos abaixo para efetuar o cadastro da sua oferta.</p>
                        <p>Marque a opção de doação se quiser que seu produto seja doado.</p>
                    </div>
                    <form method="POST" id="form_cadastro_venda">
                        <div className="campo">
                            {/* <!-- <label>Nome</label> --> */}
                            <input type="text" placeholder="Nome do produto" aria-label="Digite seu nome" name="nome" required/>
                        </div>
                        <div className="campo">
                            {/* <!-- <label>Tamanho</label> --> */}
                            <input type="text" placeholder="Tamanho do produto" aria-label="Digite o tamanho" name="tamanho" required/>
                        </div>
                        <div className="campo">
                            {/* <!-- <label>Peso</label> --> */}
                            <input type="text" placeholder="Peso do produto" aria-label="Digite o peso" name="peso" required/>
                        </div>
                        <div className="campo">
                            {/* <!-- <label>Quantidade</label> --> */}
                            <input type="text" placeholder="Quantidade" aria-label="Digite a quantidade" name="quantidade" required/>
                        </div>
                        <div className="campo">
                            {/* <!-- <label>Cor</label> --> */}
                            <input type="text" placeholder="Cor" aria-label="Digite a cor" name="cor" required/>
                        </div>                        
                        <div className="campo">
                            {/* <!-- <label>Data de Validade</label> --> */}
                            <input type="text" placeholder="Data de validade" aria-label="Indique a data de validade" name="dtvalidade" required/>
                        </div>
                        <div className="campo">
                            {/* <!-- <label>Data limite de Venda</label> --> */}
                            <input type="date" placeholder="Titulo da oferta" aria-label="Limite para venda" name="dtlimvd" required/>
                        </div>
                        <div className="campo">
                            {/* <!-- <label>Data limite para doação</label> --> */}
                            <input type="text" placeholder="Descrição do produto" aria-label="Descrição" name="descricao" required/>
                        </div>
                        <div className="campo">
                            {/* <!-- <label>Valor unitário</label> --> */}
                            <input type="number" placeholder="Valor unitário da oferta" aria-label="Digite o valor unitário"/>
                        </div>
                        <hr/>
                        <div className="checks">
                            <div className="check">
                                <input type="checkbox" aria-label="Doação" name="tipo" required/>
                                <label>Doação</label>
                            </div>
                            <div className="check">
                                <input type="checkbox" aria-label="Venda" name="tipo" required/>
                                <label>Venda</label>                           
                            </div>
                        </div>
                        <hr/> 
                        {/* <!-- Utilizada para inserir uma linha--> */}
                        <div className="fotos">
                            <label>Foto</label>
                            <input type="file" accept="image/png, image/jpeg" placeholder="Adicionar fotos Você também pode arrasta-lás" aria-label="Adicionar fotos Você também pode arrasta-lás" name="foto"/>
                        </div>
                        <div className="btnCadastro">
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Cad_categoria;